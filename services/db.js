
// import library
const mongoose = require('mongoose')

// connection string : to connect db with server
mongoose.connect('mongodb://localhost:27017/remServer', {
    useNewUrlParser: true
})

// create a modal to perform db

const User = mongoose.model('User', {

    userId: String,
    uname: String,
    pwd: Number,
    records: []

})

module.exports = {
    User
}