const mongoose = require('mongoose')
try {
    mongoose.connect(`${process.env.DB_STRING_URL}`)
    console.log(`DB connected to mongodb`)
} catch (error) {
    console.log('error while connecting DB ' , error);
}

const userSchema = new mongoose.Schema(
    {
        email:{
            type : String,
            required : true,
            unique : true ,
            lowercase : true ,
            trim :true ,
            index : true
        },
        password : {
            type : String,
            required : true
        }
    } , {timestamps:true}
)

const User = mongoose.model("User", userSchema);

module.exports = User;


