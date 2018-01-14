
'use strict'

// Requiring our models
const db = require('../models')
const { Op } = require('sequelize')

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../middleware/isAuthenticated')


module.exports = app => {

  //
  //
  // users
  //
  //

  app.get('/users', async function(req, res) {

    try {
      const findOptions = {
        where: {
          id: {
            [Op.ne]: req.user.id
          }
        }
      }
      const users = await db.User.findAll(findOptions)

      res.json({ users })
    }
    catch (err) {
      console.log('Error getting user: ', err)
      res.status(500).send('Error getting users.')
    }

  })


  //
  //
  // conversations
  //
  //

  app.get('/conversations', async function(req, res) {

    try {
      const findOptions = {
        include: [
          {
            model: db.Message,
            order: [['createdAt', 'DESC']],
            include: [{ model: db.User }]
          },
          db.User
        ],
        order: [['createdAt', 'DESC']]
      }
      const user = await db.User.findOne({ where: { id: req.user.id }})
      const conversations = await user.getConversations(findOptions)

      res.json(conversations)
    }
    catch (err) {
      console.log('Error getting conversations: ', err)
      res.status(500).send('Error getting conversations')
    }

  })

  app.post('/conversations', async function(req, res) {

    const { users, title } = req.body
    users.push(req.user)

    try {
      const conversation = await db.Conversation.create({ title })
      const findOptions = {
        where: {
          id: {
            [Op.in]: users.map( u => u.id )
          }
        }
      }
      const userInstances = await db.User.findAll(findOptions)
      await conversation.setUsers(userInstances)

      res.json(conversation)
    }
    catch (err) {
      console.log('Error creating conversation: ', err)
      res.status(500).send('Error creating conversation')
    }
  })



  //
  //
  // messages
  //
  //

  app.post('/messages', async function(req, res) {
    
    try {
      const message = await db.Message.create(req.body)

      res.json(message)
    }
    catch (err) {
      console.log('Error creating message: ', err)
      res.status(500).send('Error creating message')
    }

  })

}
