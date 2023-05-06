// Import User Model
import User from '../models/User.js'; // must include .js
//  Import Status Codes package
import { StatusCodes } from 'http-status-codes';
// Import Error Classes
import { BadRequestError, NotFoundError, UnAuthenticatedError } from '../errors/index.js';
// Import Cookie Function
import attachCookies from '../utils/attachCookies.js';

// Authentication functions are async because we are communicating with database
// RegisterUser Controller
const registerUser = async function (req, res) {
	const { firstName, lastName, email, password } = req.body;

	// Check for empty values submitted
	if (!firstName || !lastName || !email || !password) {
		throw new BadRequestError('Please provide all requested fields');
	}

	// Check for unique email - emails must be unique
	const userAlreadyExists = await User.findOne({ email });
	if (userAlreadyExists) {
		throw new BadRequestError('Email is already in use');
	}

	// try {
	// 	const user = await User.create(req.body);
	// 	res.status(201).json({ user });
	// } catch (error) {
	// 	// #1 Error msg coming from mongoose
	// 	// res.status(500).json({ msg: 'There was an error' });
	// 	// #2 Passing error to our error handler middleware
	// 	next(error);
	// }

	// Using express-async errors package, no need for async try / catch block
	// Note: b/c we use user.create, we get password back despite 'select: false' in User model
	const user = await User.create({ firstName, lastName, email, password });
	const token = user.createJWT();

	// Attach cookies
	attachCookies({ res, token });

	res.status(StatusCodes.CREATED).json({
		user: {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			location: user.location,
		},
		// remove token from response since we are now using cookies
		location: user.location,
	});
};

// Login Controller
const login = async function (req, res) {
	const { email, password } = req.body;

	// check if email and password is provided
	if (!email || !password) {
		throw new BadRequestError('Please fill out required fields');
	}

	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		throw new UnAuthenticatedError('Invalid credentials');
	}

	// console.log(user);
	// when you use findOne method to find user, password does not come back because of 'select: false' option on User model
	// Must override that with .select('+password)

	const isPasswordCorrect = await user.comparePassword(password);
	if (!isPasswordCorrect) {
		throw new UnAuthenticatedError('Invalid credentials');
	}

	const token = user.createJWT();
	// set password to undefined so password is removed from response

	user.password = undefined;
	// console.log(user);

	// Attach Cookies
	attachCookies({ res, token });

	res.status(StatusCodes.OK).json({
		user,
		// remove token from response since we are now using cookies

		location: user.location,
	});
};

// Update User Controller
const updateUser = async function (req, res) {
	// We always have access to the user
	// console.log(req.user);

	const { firstName, lastName, email, location } = req.body;
	// check if email and password is provided
	if (!firstName || !lastName || !email || !location) {
		throw new BadRequestError('Please fill out required fields');
	}

	// when you use findOne method to find user, password does not come back because of 'select: false' option on User model

	const user = await User.findOne({ _id: req.user.userID });

	user.email = email;
	user.firstName = firstName;
	user.lastName = lastName;
	user.location = location;

	// user.save() vs User.findOneAndUpdate - User.findOneAndUpdate will not trigger "save" pre hook
	await user.save();

	// there are various setups
	// in this case only id
	// if other properties included, must re-generate
	// you don't have to create a new token because we are not changing userID, which is the payload for the creating the JWT, so its up to you whether you want to create a new JWT when you update user

	const token = user.createJWT();

	// Attach cookies
	attachCookies({ res, token });

	res.status(StatusCodes.OK).json({
		user,
		// remove token from response since we are now using cookies

		location: user.location,
	});
};

const getCurrentUser = async function (req, res) {
	const user = await User.findOne({ _id: req.user.userID });
	res.status(StatusCodes.OK).json({ user, location: user.location });
};

const logOutUser = async function (req, res) {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: 'User Logged Out.' });
};

export { registerUser, login, updateUser, getCurrentUser, logOutUser };
