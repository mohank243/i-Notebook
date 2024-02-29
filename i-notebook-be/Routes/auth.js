const express = require('express')
const { body, validationResult } = require('express-validator');
const users = require('../Modals/Users')

const router = express.Router()

router.post('/',[
       body('name','Add the Valid Name').isLength({min:3}),
       body('email', "provide the correct email").isEmail(),
       body('password', 'password should consist atleast 5 chars').isLength({min:5})
], (req,res) =>{
       console.log(req.body)
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
       }
       // res.send(req.body) //Cannot set headers after they are sent to the client
       // const user= users(req.body)//providing the body for schema Check
       // user.save()//saving into the DB
       users.create({
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
          }).then(user => res.json(user))
          .catch(err=>{
              console.log(err)
              res.json({error:" There is a error", message:err.message})
          })
          
})

module.exports = router;