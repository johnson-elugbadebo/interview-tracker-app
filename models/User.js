// Import Mongoose
import mongoose from 'mongoose';
// Import Validator to validate email addresses
import validator from 'validator';
// Import Bcrypt package for hashing passwords
import bcrypt from 'bcryptjs';
// Import JWT package to authenticate users
import jwt from 'jsonwebtoken';

// Create Schema, which defines Structure for the Document you're creating
// Add in Validation into Schema with properties for each field
// A Model is a Wrapper for the Schema, an Interface to the DB
// Using a model, you can easily perform CRUD on your DB
const UserSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, 'Please provide first name'],
			trim: true,
			maxLength: [20, 'First name cannot be more than 20 characters'],
			minLength: [2, 'First name must be at least 2 characters'],
		},
		lastName: {
			type: String,
			required: [true, 'Please provide last name'],
			trim: true,
			maxLength: [20, 'Last name cannot be more than 20 characters'],
			default: 'Last name',
		},
		email: {
			type: String,
			required: [true, 'Please provide email'],
			validate: {
				validator: validator.isEmail,
				message: 'Please provide a valid email',
			},
			unique: true, // user must submit an email that is unique, not already in use
		},
		password: {
			type: String,
			required: [true, 'Please provide password'],
			minLength: [6, 'Password must be at least 6 characters'],
			select: false, // password still returns b/c of user.create in register user controller
		},
		location: {
			type: String,
			trim: true,
			maxLength: [20, 'Location cannot be more than 20 characters'],
			default: 'My City',
		},
	},
	{ timestamps: true }
);

// Hashing Password
// Will get triggered when we Create user and Update user
// This middleware must be defined before model is compiled
// user.save() vs User.findOneAndUpdate - User.findOneAndUpdate will not trigger "save" pre hook
UserSchema.pre('save', async function () {
	// console.log(this.modifiedPaths()); // returns fields that are updated
	if (!this.isModified('password')) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// Instance Method to create JSON Web Token
UserSchema.methods.createJWT = function () {
	return jwt.sign({ userID: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

// Instance Method to Compare Password for Authentication on Login
// Bcrypt.js has a compare method where you compare password submitted
// It compares the hashed password and stored hashed password in the user record
UserSchema.methods.comparePassword = async function (candidatePassword) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);
	return isMatch;
};

// Compile model from Schema
// Parameters when exporting are model name and schema
export default mongoose.model('User', UserSchema);
