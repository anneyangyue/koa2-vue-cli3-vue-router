var mongoose = require('mongoose')
let client = null

client = mongoose.connect('mongodb://127.0.0.1:27017/app', function (err) {
  if (err) {
    throw err
  } else {
    console.log('mongodb connect...')
  }
})

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String
})

var userListSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String
})

exports.userModel = mongoose.model('user', userSchema, 'user')
exports.userListModel = mongoose.model('userList', userListSchema, 'userList')

exports.closeClient = async () => {
  if (client) {
    try {
      await client.close()
    } catch (e) {
      throw e
    }
  }
}
