
import React, { Component } from 'react'
import { Col, Row, Container } from '../../components/Grid'
import { List, ListItem } from '../../components/List'
import { Input, FormBtn } from '../../components/Form'
import ErrorDisplay from '../../components/ErrorDisplay'
import API from '../../utils/API'

class NewConversation extends Component {

  state = {
    users: [],
    errors: [],
    title: ''
  }

  componentDidMount() {
    API.getUsers()
      .then( res => {
        const { users } = res.data
        this.setState({ users })
      })
      .catch(console.error)
  }

  toggleUserSelection = user => {
    user.selected = !user.selected
    this.setState({ users: this.state.users })
  }

  getSelectedUsers = () => {
    return this.state.users.filter( user => user.selected )
  }

  dismissError = idx => {
    const { errors } = this.state

    errors.splice(idx, 1)

    this.setState({ errors })
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = (event, history) => {
    event.preventDefault()

    const { title } = this.state
    const selectedUsers = this.getSelectedUsers()

    if ( !(title && selectedUsers.length) ) return

    API.createConversation({ title, users: selectedUsers })
      .then( res => {
        const { errors } = res.data

        if ( errors ) {
          return this.setState({ errors })
        }

        history.push('/')

      })
      .catch(console.error)
  }

  render() {
    const { users, title, errors } = this.state
    const { history } = this.props

    return (
      <Container fluid>
        <Row>

          <Col size='md-4'></Col>

          <Col size='md-4'>
            {
              users.length ? (
                <div>

                  <div style={{ marginBottom: 25 }}>
                    <h3>1. Name your conversation</h3>
                    <Input
                      value={ title }
                      onChange={ this.handleInputChange }
                      onKeyDown={ event => (event.keyCode === 13) && this.handleFormSubmit(event, history) }
                      name='title'
                      placeholder='Conversation Title (required)'
                    />
                  </div>

                  <div style={{ marginBottom: 25 }}>
                    <h3>2. Select conversation participants</h3>
                    <List>
                      {
                        users.map( user => (
                          <ListItem
                            key={ user.id }
                            onClick={ () => this.toggleUserSelection(user) }
                            style={{ cursor: 'pointer' }}
                          >
                            { user.selected ? <span role='img' aria-label='check'>✅</span> : '' } { user.username }
                          </ListItem>
                        ))
                      }
                    </List>
                  </div>

                  <div>
                    <FormBtn
                      disabled={ !(title && this.getSelectedUsers().length ) }
                      onClick={ event => this.handleFormSubmit(event, history) }
                    >
                      Create
                    </FormBtn>
                  </div>
                </div>
              ) : (
                <h3 className='alert alert-warning'>No other users to converse with.. <span role='img' aria-label='sad face'>😥</span></h3>
              )
            }
          </Col>

        </Row>

        <ErrorDisplay errors={ errors } dismiss={ this.dismissError } />

      </Container>
    )
  }

}

export default NewConversation
