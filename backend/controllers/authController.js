const User = require('../models/user');
const { hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working')
}

// Register endpoint
const registerUser = async (req,res) => {
     try{
        const {firstname, lastname, email, password} = req.body; 
        
        // Check if first name was entered
        if(!firstname) {
            return res.json({
                error: 'name is required'
            })
        }

        // Check if last name was entered
        if(!lastname) {
            return res.json({
                error: 'name is required'
            })
        };

        // Check if password is good
        if(!password || password.length < 6){
            return res.json({
               error: 'Password is required and should be at least 6 characters long' 
            })
        };

        // Check email
        const exist = await User.findOne({email}) ;
        if(exist) {
            return res.json({
                error: 'Email is taken already'
            })
        } 
        
        const hashedPassword = await hashPassword(password)
        // Create user in database
        const user = await User.create({
            firstname, 
            lastname, 
            email, 
            password: hashedPassword,
        })

        return res.json(user)
     }catch (error) {
         console.log(error)
     }
}

// Login endpoint
const loginUser = async (req, res) => {
   try{
     const {email, password} = req.body;

     // Check if user exists
     const user = await User.findOne({email});
     if(!user) {
        return res.json ({
            error: 'No user found'
        })
     }

     // Check if password match
     const match = await comparePassword(password, user.password)
     if(match) {
        jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err,token) => {
            if(err) throw err;
            res.cookie('token', token).json(user)
        })
     }
     if(!match) {
        res.json({
            error: "Password not match"
        })
     }
   } catch (error) {
       console.log(error)
   }
}

module.exports = {
    test,
    registerUser,
    loginUser
}