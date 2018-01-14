
import React, { Component } from 'react'
import API from '../../utils/API'
import io from 'socket.io-client'
import AuthInterface from '../../utils/AuthInterface'
import { Link } from 'react-router-dom'
import { Col, Row, Container } from '../../components/Grid'
import { List, ListItem } from '../../components/List'
import { Input } from '../../components/Form'
import MessageList from '../../components/MessageList'

class Conversations extends Component {

  state = {
    conversations: [],
    selectedConvo: null,
    messageDraft: ''
  }

  componentDidMount() {
    this.loadConversations()
    this.loadSocketServer()
  }

  loadConversations = () => {
    API.getConversations()
      .then(res => {
        this.setState({ conversations: res.data })
      })
      .catch(console.error)
  }

  loadSocketServer = () => {

    const { username } = AuthInterface.getUser()

    // Connect to the server
    this.socket = io('/', { query: `username=${ username }` }).connect()

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessageToConvo(message)
    })

  }

  addMessageToConvo = msg => {
    const { conversations } = this.state
    const convo = conversations.find( convo => convo.id === msg.ConversationId )
    convo && convo.Messages.push(msg)

    this.setState({ conversations })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  sendMessage = event => {
    event.preventDefault()

    const { messageDraft: body, selectedConvo } = this.state
    const { id: UserId, username } = AuthInterface.getUser()

    if ( body && selectedConvo ) {
      const messageAttrs = {
        body,
        UserId,
        ConversationId: selectedConvo.id
      }

      API.saveMessage(messageAttrs)
        .then(({ data }) => {

          data.User = { username }

          this.socket.emit('client:message', data)
          selectedConvo.Messages.push(data)

          this.setState({ selectedConvo, messageDraft: '' })
        })
        .catch(console.error)
    }
  }

  render() {
    const { conversations, selectedConvo, messageDraft } = this.state

    return (
      <Container fluid>
        <Row>
          <Col size='md-5 sm-12'>

            <h2 style={{ paddingTop: 25, paddingLeft: 25 }}>
              Conversations
            </h2>

            <div style={{ textAlign: 'right', margin: 10 }}>
              <Link to='/conversation/new'>
                Start new convo
              </Link>
            </div>

            { conversations.length ? (
              <List>
                { conversations.map(convo => (
                  <ListItem
                    key={convo.id}
                    style={{ cursor: 'pointer' }}
                    onClick={ () => this.setState({ selectedConvo: convo }) }
                  >
                    <strong>
                      { convo.title }
                    </strong>
                    <div>
                      { convo.Users.map( user => user.username ).join(', ') }
                    </div>
                    <div className='pull-right' style={{ marginTop: -35, fontSize: 20 }}>
                      {
                        (selectedConvo && selectedConvo.id === convo.id) ? '➡️' : ''
                      }
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3 className='alert alert-warning'>No Conversations</h3>
            )}
          </Col>

          <Col size='md-7'>
            {
              selectedConvo ? (
                <div>
                  <MessageList conversation={ selectedConvo } />
                  <div className='input-group' style={{ bottom: 20, position: 'fixed', width: '55%' }}>
                    <Input
                      value={ messageDraft }
                      onChange={ this.handleInputChange }
                      onKeyDown={ event => (event.keyCode === 13) && this.sendMessage(event) }
                      name='messageDraft'
                      placeholder=''
                    />
                     <span className="input-group-btn">
                       <button
                         className="btn btn-info"
                         type="button"
                         disabled={ !messageDraft }
                         onClick={ this.sendMessage }
                       >
                         Send
                       </button>
                     </span>
                    
                  </div>
                </div>
              ) : (
                <h1>
                  Select a convo from the list to the left.
                </h1>
              )
            }
          </Col>

        </Row>
      </Container>
    )
  }
}

export default Conversations
