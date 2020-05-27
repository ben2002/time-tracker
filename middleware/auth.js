var jwt = require('jsonwebtoken');
require('dotenv').config();
const config = require('config');

module.exports = function (req, res, next) {
	// get the token from header
	const token = req.headers['x-auth-token'];

	// invalid or no token
	if (!token) return res.status(401).json({ msg: 'no token, authorization denied' });

	// verify the token
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ msg: 'invalid token' });
		}
		// make userid available in the request object
		req.user = decoded.user;
		next();
	});
};
