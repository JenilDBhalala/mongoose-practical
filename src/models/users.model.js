const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate : (value) => {
            if(!validator.isEmail(value))
                throw new Error('email is not valid!')
        }
    },
    password : {
        type : String, 
        required : true,
        trim : true,
        minlength : 6,
        validate : (value) => {
            if(value.toLowerCase().includes('password'))
                throw new Error('password can not contain word password!')
        }
    },
    age : {
        type : Number,
        required : true,
        trim : true,
        validate : (value) => {
            if(value <= 15)
                throw new Error('age must be greater than 15!')
        }
    },
    tokens : [{
        token : {
            type: String
        }
    }]
}, {timestams : true})


//hiding private data
userSchema.methods.toJSON = function(){
    const user = this;
    let userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}


//generating token 
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({id : user._id},process.env.JWT_SECRET);

    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}


//encrypt password before saving it into database
userSchema.pre('save', async function (next){
    const user = this;
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 10);
    next();
})

module.exports = mongoose.model('User', userSchema);