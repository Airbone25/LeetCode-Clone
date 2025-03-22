const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error: 'Auth Token is required'})
    }
    const token = authorization.split(' ')[1]
    try{
        const {id} = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(id)
        next()
    }catch(error){
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = authenticate