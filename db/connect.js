// Import Mongoose
import mongoose from 'mongoose';

// Mongoose connect method returns a promise, therefor in server we set up async await
// set('strictQuery', true) to remove deprecation warning
// Connect mongoose and database
const connectDB = function (url) {
	return mongoose.set('strictQuery', true).connect(url);
};

export default connectDB;
