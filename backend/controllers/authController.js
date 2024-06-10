const User = require('../models/user')

const test = (req, res) => {
    res.json('test is working')
}

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

        const user = await User.create({
            firstname, lastname, email, password
        })

        return res.json(user)
     }catch (error) {
         console.log(error)
     }
}

module.exports = {
    test,
    registerUser
}