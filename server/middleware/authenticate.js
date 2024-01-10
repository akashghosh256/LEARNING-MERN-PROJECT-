const User = require("../models/userSchema");
const jwt = require('jsonwebtoken');
//const jwt = require('mernjwttoken');





// Middleware for authentication
const authenticate = async (req,res,next) => {
try{
const token = req.cookies.mernjwttoken;  // ascessing the saved toekn from browser cookies 
const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token":token });

if(!rootUser){
    throw new Error('User Not Found');
}

// this token will be needed for About page
req.token = token;
req.rootUser = rootUser;
req.userID = rootUser._id;
next(); // to leave midlleware after work done

}
catch(err){
res.status(401).send('Unauthorized No token provided');
console.log(err);
//return res.status(401).json({ error : 'Unauthorized No token provided'});

}
}

module.exports = authenticate;


















