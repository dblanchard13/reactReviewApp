import axios from 'axios'

export default {

  // Gets all users
  getUsers: () => ( axios.get('/users') ),

  // Gets all conversations
  getConversations: () => ( axios.get('/conversations') ),

  // Gets the conversation with the given id
  getConversation: id => ( axios.get(`/conversations/${ id }`) ),

  // Saves a book to the database
  createConversation: convo => ( axios.post('/conversations', convo) ),

  // Saves a book to the database
  saveMessage: msg => ( axios.post('/messages', msg) ),

  signup: credentials => ( axios.post('/signup', credentials) ),

  login: credentials => ( axios.post('/login', credentials) ),

  checkForSession: credentials => ( axios.get('/session') ),

}
