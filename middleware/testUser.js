import { BadRequestError } from '../errors/index.js';

const testUserMiddleware = function (req, res, next) {
	if (req.user.testUser) {
		throw new BadRequestError('Test User Access has Read-Only Privileges.');
	}
	next();
};

export default testUserMiddleware;
