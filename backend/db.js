const mongoose = require ('mongoose');
const { string } = require('zod');

mongoose.connect("mongodb+srv://admin:khaled%402244@cluster0.gaqftbj.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        require : true,
        unique : true,
        trim  : true,
        lowercase : true,
        minlength  : 3, 
        maxlenght : 30,
    },

    password : {
        type : String,
        require : true,
        minlength : 6,
    },

    firstName : {
        type : String,
        trim  : true,
        require :  true,
        maxlenght: 50,
    },

    lastName : {
        type : String,
        require : true,
        trim : true,
        maxlenght :50,
    }

});

const accountSchema =  mongoose.Schema({
    userId : {
        type  : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true, 
    },

    balance : {
        type : Number,
        require : true,
    }
})


const User = mongoose.model("User" , userSchema);
const Account = mongoose.model('Account',accountSchema);

module.exports= {
    User,
    Account, 
}