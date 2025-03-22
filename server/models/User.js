const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    solved: {
        type: Number,
        default: 0
    },
    attempted: {
        type: Number,
        default: 0
    }
})

userSchema.statics.signup = async function(username,password){
    const existingUser = await this.findOne({username})
    if(existingUser){
        throw new Error("Username Already Exist!")
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await this.create({username,password: hashedPassword})
    return user
}

userSchema.statics.login = async function(username,password){
    const user = await this.findOne({username})
    if(!user){
        throw new Error("User Does not Exist!")
    }
    const isValid = await bcrypt.compare(password,user.password)
    if(!isValid){
        throw new Error("Wrong Password!")
    }
    return user
}

module.exports = mongoose.model('User',userSchema)