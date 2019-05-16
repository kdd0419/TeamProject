const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    id: { type: String, default: '', unique: true, index: true },
    pw: { type: String, default: ''},
    name: {type: String, default: ''},
    age: { type: Number, default: 1 }
})

const S_User = mongoose.model('S_User', userSchema)

module.exports = S_User
