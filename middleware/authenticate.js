import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from '../errors/index.js';

const authenticateUserMiddleware = async function (req, res, next) {
	// Log headers to see what is sent back
	// const header = req.headers;

	// Use Cookies instead of Checking req.headers.authorization for Bearer Token
	// See notes on Cookies in attachCookies.js
	//console.log(req.cookies);

	const token = req.cookies.token;
	if (!token) {
		throw new UnAuthenticatedError('Authentication Invalid');
	}

	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		// console.log(payload);
		// attach the user request object
		// req.user = payload

		// Test User restriction to read-only
		// testUser is either true or false
		const testUser = payload.userID === '640d1f0b605003ed402f69fc';
		req.user = { userID: payload.userID, testUser };
		next();
	} catch (error) {
		throw new UnAuthenticatedError('Authentication Invalid');
	}
};

export default authenticateUserMiddleware;
