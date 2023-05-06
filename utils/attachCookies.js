// Problem: With prior setup, we send back jwt token with json response, and on front end we store token in State and Local Storage.  But Local Storage can be accessed with javaScript, there are some security concerns.
// Solution: instead of token json response, we send token with http only cookie, which can be accessed only by the browser, and not javaScript.
// Additionally: with cookies, no need to worry about storing token in State or Local Storage, since browser will automatically send back cookie
// Notes: Cookies won't work with frontend (client) and backend (server) are setup on different servers.

const attachCookies = function ({ res, token }) {
	// Setup Cookie
	const oneDay = 1000 * 60 * 60 * 24;
	res.cookie('token', token, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: (process.env.NODE_ENV = 'production'),
	});
};

export default attachCookies;
