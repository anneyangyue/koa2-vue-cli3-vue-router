let mongoose = require('mongoose')
let client = null

client = mongoose.connect('mongodb://127.0.0.1:27017/app', function (err) {
  if (err) {
    throw err
  } else {
    console.log('mongodb connect...')
  }
})

let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String
})

let userListSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: String
})

let checkCodeSchema = new mongoose.Schema({
  code: String
})

exports.userModel = mongoose.model('user', userSchema, 'user')
exports.userListModel = mongoose.model('userList', userListSchema, 'userList')
exports.checkCodeModel = mongoose.model('code', checkCodeSchema, 'code')

exports.closeClient = async () => {
  if (client) {
    try {
      await client.close()
    } catch (e) {
      throw e
    }
  }
}
