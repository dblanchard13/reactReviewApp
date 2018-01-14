
import React, { Component } from 'react'
import AuthInterface from '../../utils/AuthInterface'

class MessageList extends Component {

  scrollToBottom = () => {
    this.messagesEnd && this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const { conversation } = this.props
    const { Messages: messages } = conversation
    const user = AuthInterface.getUser()

    return (
      <div>
        {
          messages.length ? (
            <div style={{ position: 'fixed', bottom: 50, top: 65, right: 0, left: '41%', overflowY: 'scroll' }}>
              {
                messages.map( msg => (
                  <div key={ msg.id }  className='row'>
                    <div
                      className={ msg.UserId === user.id ? 'col-md-7 col-md-offset-4 text-left bg-info' : 'text-left col-md-7 col-md-offset-1 bg-warning'}
                      style={{ paddingTop: 10, paddingBottom: 10, marginTop: 20, marginBottom: 20, borderRadius: 10 }}
                    >
                      { msg.UserId === user.id ? null : <strong>{ msg.User.username }:</strong> } { msg.body }
                    </div>
                  </div>
                ))
              }
              <div
                style={{ float: 'left', clear: 'both' }}
                ref={ el => this.messagesEnd = el }
              ></div>
            </div>
          ) : (
            <h2 className='text-center alert alert-warning'>
              No messages
            </h2>
          )
        }
      </div>
    )
  }

}

export default MessageList
