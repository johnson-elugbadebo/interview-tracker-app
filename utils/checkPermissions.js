import { UnAuthenticatedError } from '../errors/index.js';

const checkPermissions = function (requestUser, resourceUserID) {
	// if (requestUser.role === 'admin') return
	// if ID's match you return out of checkPermissions and you proceed
	if (requestUser.userID === resourceUserID.toString()) return;

	throw new UnAuthenticatedError('Not authorized to access this route');
};

export default checkPermissions;
