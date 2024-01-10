const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({

    name :{
        type : String,
        required : true
    },

    email: {
        type: String,
        required : true
    },

   phone: {
        type: Number,
        required : true
    },

work:{
        type: String,
        required : true
    },
    

    password :{
        type: String,
        required : true
    },

    cpassword: {
        type: String,
        required : true
    },

    tokens : [
        {
            token:{
                type: String,
                required : true
            }
        }
    ]

})




// we are hashing password video 13
// it will get call when any change is password is detcted
userSchema.pre('save', async function(next){
    console.log("hashing password bro (from userSchema.js)");
   if(this.isModified('password')){
   
    this.password = bcrypt.hashSync(this.password, 12);
    this.cpassword = bcrypt.hashSync(this.cpassword, 12);
   }
   next();
});


// we are generating token

userSchema.methods.generateAuthToken = async function(){
    try{
let token  = jwt.sign({_id:this._id}, process.env.SECRET_KEY); //token generated
console.log('Token generated:', token);
this.tokens = this.tokens.concat({ token: token});
await this.save(); //saves the token in database
return token;

    }catch(err){
        console.log(err);
    }
}

const User = mongoose.model('USER',userSchema);

module.exports = User;











