const express = require('express')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../Modals/Users');
const User = require('../Modals/Users');
const fetchuser = require('../Middleware/fetchuser');


const router = express.Router()

//To create user POST (api/auth/createuser) : No Login Required
router.post('/createuser',[
       body('name','Add the Valid Name').isLength({min:3}),
       body('email', "provide the correct email").isEmail(),
       body('password', 'password should consist atleast 5 chars').isLength({min:5})
], async (req,res) =>{
       let success = false;
       console.log(req.body)
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
              return res.status(400).json({ success, errors: errors.array() });
       }
       try{
       // res.send(req.body) //Cannot set headers after they are sent to the client
       // const user= users(req.body)//providing the body for schema Check
       // user.save()//saving into the DB
      let user = await users.findOne({email:req.body.email})
      if(user){
       return res.status(400).json({ success ,error: 'User with email is already exists'})
      }
      //Generating hash from the user Password
      const salt = await bcrypt.genSaltSync(10);
      const secretPassword = await bcrypt.hash(req.body.password,salt);

      user =  await users.create({
              name: req.body.name,
              email: req.body.email,
              password: secretPassword,
          })
          //Implementing JWT for Authentication
          const data={
              user:{
                     id:user.id
              }
       }
       const authToken = jwt.sign(data, 'MohanIsAGoodBoy');
          success = true
          res.json({success, authtoken:authToken})
       }
       catch(error){
              console.error(error.message);
             return res.status(500).send("Internal Server Error");
       } 
             
})

//To Login User POST (api/auth/login)
router.post('/login',[
      body('email', "provide the correct email").isEmail(),
      body('password', 'password should consist atleast 5 chars').isLength({min:5})
], async (req, res)=>{
       const {email , password} = req.body
       const errors = validationResult(req);
       let success = false;
       if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
       }
       try {
              let user = await users.findOne({email})
              //check whether user is valid
              if(!user){
                     success=false
                    return res.status(400).json({success:success, error: 'Please provide the correct Credentials'})
              }
              //compare userPassword with hashed password in DB
              const passwordCompare = await bcrypt.compare(password,user.password)
              if(!passwordCompare){
                     success=false
                   return res.status(400).json({ success:success, error: 'Please provide the correct Credentials'})
              }
               //Implementing JWT for Authentication
              const data = {
                     user: {
                            id: user.id
                     }
              }
              const authToken = jwt.sign(data, 'MohanIsAGoodBoy');
              success = true;
              res.json({ success:success,authtoken:authToken })

       } catch (error) {
              console.error(error.message);
              res.status(500).send("Internal Server Error");
       }
})

//To GetUser POST (api/auth/getuser) :  Login Required
//Using the middleware for processing the jwt token and after verifying the response is sent.
router.post('/getuser',fetchuser, async (req,res)=>{
       try {
              const userId = req.user.id
              const user = await User.findById(userId).select('-password')
              res.json(user);

       } catch (error) {
              console.error(error.message);
              res.status(500).send("Internal Server Error");
       }
})

module.exports = router;