const express = require('express');

const router = express.Router();

//connecting to db for registering users and also checking its a new user
require('../db/conn');
const User = require("../models/userSchema");

router.get('/', (req,res) => {
    res.send('hello from express router auth.js');
})

// Using Promises

// // To get data from frontend always do same
// router.post('/register',(req,res) =>{

// const { name, email, phone, work, password, cpassword} = req.body;

// // checking if user had not left any entry blank, before regstering
// if( !name|| !email|| !phone|| !work|| !password|| !cpassword){
//     return res.status(422).json({error:" fill all the fields"});
// }


// // verifying email is new for new registration, responds in true or false
// User.findOne({email:email}).then((userExist) =>{
//     if(userExist){
//         //already a user exists with same email
//         return res.status(422).json({error:" Email already exist"});
//     }
//     // else for new email

//     const user = new User({name, email, phone, work, password, cpassword});
//     user.save().then(() => {
//          res.status(201).json({message:"user registerd succesfully"});

//      }).catch((err) => res.status(500).json({error:"failed to register because of database error"})); // if any error happens during registering catch function will take care 

// }) 

// // console.log(req.body);
// // console.log(email);
// // res.json({message:req.body});
// //res.send("mera hnnn");

// });

//Using Async and await

// To get data from frontend always do same
router.post('/register', async (req,res) =>{

    const { name, email, phone, work, password, cpassword} = req.body;
    
    // checking if user had not left any entry blank, before regstering
    if( !name|| !email|| !phone|| !work|| !password|| !cpassword){
        return res.status(422).json({error:" fill all the fields"});
    }
    try{
    // verifying email is new for new registration, responds in true or false
  const userExist =  await  User.findOne({email:email});
  if(userExist){
    //already a user exists with same email
    return res.status(422).json({error:" Email already exist"});
}


const user = new User({name, email, phone, work, password, cpassword});
// const userRegister = await user.save();
await user.save();
res.status(201).json({message:"user registerd succesfully"});


// if(userRegister){
//     res.status(201).json({message:"user registerd succesfully"});
// }else{
// res.status(500).json({error:"failed to register because of database error"}); // if any error happens during registering catch function will take care 

// }

    }
    catch(err){
console.log(err);
    }
    
    

    

    
    });


module.exports = router;







