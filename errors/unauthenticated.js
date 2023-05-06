//  Import Status Codes package
import { StatusCodes } from 'http-status-codes';
//  Import Custom API Error class
import CustomAPIError from './custom-api.js';

class UnAuthenticatedError extends CustomAPIError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

export default UnAuthenticatedError;
