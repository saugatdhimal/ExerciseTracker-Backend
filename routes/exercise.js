import express from 'express'
import Exercise from '../models/exerciseModel.js'

const router = express.Router();

router.route('/').get((req,res)=> {
    Exercise.find({})
            .sort({updatedAt: 'desc'})
            .exec((error,data)=> {
        if(error) console.log(error)
        else if(!error && data) res.json(data)
    })
})

router.route('/add').post((req,res)=> {
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });
    newExercise.save((error,data)=>{
        if(error) res.json('Plz fill all the fields correctly')
        else if(!error && data) res.json("Exercise Added")
    })
})

router.route('/:id').get((req,res) => {
    Exercise.findById(req.params.id,(error,data) => {
        if(error) console.log(error)
        else if(!error && data) res.json(data)
    })
})

router.route('/:id').delete((req,res) => {
    Exercise.findByIdAndRemove(req.params.id,(error,data) => {
        if(error ) console.log(error)
        else if(!error && data) res.json("Successfully Deleted")
    })
})

router.route('/update/:id').post((req,res) => {
    Exercise.findById(req.params.id,(error,data) => {
        if(error) {console.log(error)}
        else if(!error && data){
            Exercise.findByIdAndUpdate(req.params.id,{
                username: req.body.username || data.username,
                description: req.body.description || data.description,
                duration: Number(req.body.duration) || Number(data.duration),
                date: Date.parse(req.body.date) || Date.parse(data.date)
            },
            {new: true},
            (error,updatedData) => {
                if(error) console.log(error)
                else if(!error && updatedData) res.json("Exercise Updates")
            }
            )
        }
    })
})

export default router