const mongoose = require('mongoose')
const config = require('dotenv')
config.config();
try {
    mongoose.connect(`${process.env.DB_STRING_URL}`)
    console.log(`DB connected to mongodb`)
} catch (error) {
    console.log('error while connecting DB ' , error);
}

const userSchema = new mongoose.Schema(
    {
        name : {
            type: String,
        },
        email:{
            type : String,
        },
        feedback : {
            type : String
        },
        reviewOption: {
            type: String,
            enum: ['Unhappy', 'Neutral', 'Satisfied'] // Define the allowed options
        }    
    } , {timestamps:true}
)

const User = mongoose.model("User", userSchema);

module.exports = User;


