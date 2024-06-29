const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required:[true, "Please enter your name"],
        maxLength: [30,"Name cannot exceed 30 characters"],
        minLength: [3, "Name should have at least 3 characters"]
    },

    email: {
        type: String,
        required:[true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },

    password:{
        type: String,
        required: [true, "Please enter your password."],
        minLength: [8, "Password length should be greater than 8 characters."],
        select: false,
    },

    avatar:{
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
    },

    role:{
        type: String,
        default: "user"
    },

    resetPasswordToken: String,
    
    resetPasswordExpire: Date,

});

//password hashing before saving to database
userSchema.pre("save", async function(next){

    //if password is not changed don't hash it again
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

});

// CREATE JWT TOKEN
userSchema.methods.getJWTToken = function(){
   return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
   });
};

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


module.exports = mongoose.model("User", userSchema);