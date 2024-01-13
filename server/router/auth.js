const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const cookieParser = require("cookie-parser");
router.use(cookieParser());

//connecting to db for registering users and also checking its a new user
require('../db/conn');
const User = require("../models/userSchema");

router.get('/', (req,res) => {
    res.send('hello from express sever-router auth.js');
})


// Registration route -------------------------------------------

// Using Promises----------------------------------------------------------------------------------------------------------------------

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



//Using Async and await-----------------------------------------------------------------------------------------------------------------------------------

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
else if( password != cpassword){
    return res.status(422).json({error:" password not matching to cpassword"});
 
}
else{




const user = new User({name, email, phone, work, password, cpassword});
//----------------------------------------------------------------MIDDLEWARE-----------------------------------------------------------------------
// here we will call a function for hashing password and cpassword before adding it to database
// and before saving, act as a middleware 
// function is written in userSchema.js and it will automatically get called from there


// const userRegister = await user.save();
const userRegister =await user.save();
console.log(`${user} user registered bro`);
console.log(userRegister);

res.status(201).json({message:"user registerd succesfully"});


// if(userRegister){
//     res.status(201).json({message:"user registerd succesfully"});
// }else{
// res.status(500).json({error:"failed to register because of database error"}); // if any error happens during registering catch function will take care 

// }

    }}
    catch(err){
console.log(err);
    }
    
    });

// login/singIn route------------------------------------------------

router.post('/signin', async (req,res) =>{
    // console.log(req.body);
    // res.json({message:"logging in"});
    try {
const {email, password} = req.body;

if( !email || !password){
    return res.status(400).json({error:"plz fill data"}); //both email and password should be filled for login
}




const userLogin = await User.findOne({email : email}); //verifying email from mongo if it already exist in db

// video 14
if(userLogin){

    // verifying password 
const isMatch = await bcrypt.compare(password, userLogin.password);

// const token = await userLogin.generateAuthToken();
// console.log(token);

if(!isMatch){
    // invalid password
    res.status(400).json({error:"Invalid Credentials"});
}
else{

 //   res.json({message:"user password matched"}); 
 
// The "Cannot set headers after they are sent to the client" error in Node.js typically occurs when you try to 
// send a response to the client after you've already sent a response. This usually happens when you attempt to
//  send multiple responses for a single HTTP request. In Express, the response is sent to the client with methods 
//  like res.send(), res.json(), or res.end().


// token should be generated only when signin is successfull
 const token = await userLogin.generateAuthToken();  //getting token from userSchema.js
// video 16 
res.cookie("mernjwttoken", token,{
    expires: new Date(Date.now() + 30000000), //time in min
    httpOnly:true
});

 res.json({ message: "user signin successfull"});
 console.log(userLogin);

//console.log("token generated",token);
}}
else{
    //invalid email
    res.status(400).json({error:"Invalid Credentials"});
}

// console.log(userLogin);
// if(!userLogin){
// res.status(400).json({ error: "user signin error"});
// }
// else{
//     res.json({ message: "user signin successfull"});
// }

}
catch(err){
console.log(err);
        }
});


// About us ka page for authentication video 32

router.get('/about',authenticate , (req,res) => {
    console.log('about server hi from auth js');
    res.send(req.rootUser);
});


// this path is for both contact and home page
router.get('/getdata',authenticate , (req,res) => {
    console.log('getting data from auth js');
    res.send(req.rootUser);
});


// contact us page backend video 36 18:00
router.post('/contact', authenticate, async (req,res) =>{
try{
   const {name, email, phone, message} =  req.body;
   if( !name || !email || !phone || !message){  //if any field is
   console.log("please fill all the fields ");
   return res.status(422).json({error:" fill all the fields"});
   }

   const userContact = await User.findOne({_id:req.userID});
   if(userContact){
    const userMessage = await  userContact.addMessage(name,email,phone,message);
    await userContact.save();
    res.status(201).json({mesage:"user contact successfully"});
   }

}
catch(error){
console.log("Contact form error ----------> ",error);
}
});

// logout video 38
// router.get('/logout',authenticate , (req,res) => {
//     console.log('logging out from auth js');
//     res.clearCookie('mernjwttoken',{path:'/login'});
//     res.status(200).send('user Logout');
// });
// router.get('/logout', (req, res) => {
//     try {
//         console.log('logging out from auth js');
//         res.clearCookie('mernjwttoken', { path: '/login' });
//         res.status(200).send('user Logout');
//     } catch (error) {
//         console.error('Error in logout route:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
router.get('/logout', (req, res) => {
    res.clearCookie('mernjwttoken');
    return res.status(200).redirect('/login');
  });



module.exports = router;













