const express = require('express')
const users = require('../Modals/Users')

const router = express.Router()

router.post('/',(req,res) =>{
       console.log(req.body)
       res.send(req.body)
       const user= users(req.body)//providing the body for schema Check
       user.save()//saving into the DB
})

module.exports = router;