
const db = require('../models')
// const { v4 } = require('uuid')

module.exports = () => {
  return db.sequelize
    .sync({ force: true })
    .then(seedDummyData)
    .catch(console.error)
}

function seedDummyData() {

  const users = [
    {
      username: 'dblanchard',
      password: '1234'
    },
    {
      username: 'guy',
      password: '1234'
    },
    {
      username: 'gal',
      password: '1234'
    },
    {
      username: 'hal',
      password: '1234'
    },
    {
      username: 'jchrist',
      password: '1234'
    }
  ]
  const userPromises = users.map(({ username, password }) => db.User.create({ username, password }) )

  const convos = [
    {
      title: 'Class stuff'
    },
    {
      title: 'Reeeact'
    },
    {
      title: 'Virtual DOM'
    },
    {
      title: 'YOLO'
    },
    {
      title: 'Beeeer'
    }
  ]
  const convoPromises = convos.map(({ title }) => db.Conversation.create({ title }) )

  return Promise
    .all( userPromises )
    .then( users => {

      this.users = users

      return Promise.all( convoPromises )
    })
    .then( convos => {

      const convoUserAssociationPromises = this.users.map( user => user.setConversations(convos))

      return Promise.all( convoUserAssociationPromises )
    })
    .catch( err => {
      console.log('Error in seeder: ', err)
    })
}
