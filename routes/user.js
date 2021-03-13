import express from 'express'
import User from '../models/userModel.js'

const router = express.Router();

router.route('/').get((req,res)=> {
    User.find({},(error,data)=> {
        if(error) console.log(error)
        else if(!error && data) res.json(data)
    })
})

router.route('/add').post((req,res)=> {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save((error,data)=>{
        if(error) res.json("This username is already taken. Try another")
        else if(!error && data) res.json("New User Added")
    })
})

export default router

