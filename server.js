import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import exerciseRouter from './routes/exercise.js'
import userRouter from './routes/user.js'

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/exercise', exerciseRouter)
app.use('/user', userRouter)

app.get('/',(req,res)=>{
    res.json("Hello Friend, Hi from Mr.Robot")
})

mongoose.connect(process.env.DB,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
        .then(() => { console.log("Connected to Database successfully")})
        


app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`)
})


