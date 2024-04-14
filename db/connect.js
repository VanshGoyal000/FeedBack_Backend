const mongoose = require('mongoose');
connectDb = async() => {
    try {
        const connectionInstance = mongoose.connect('mongodb://127.0.0.1//:27017/ecom')
        console.log(`DB connected to mongodb://127.0.0.1//:27017/ecom`)
    } catch (error) {
        console.log('error while connecting DB ' , error);
    }
}

