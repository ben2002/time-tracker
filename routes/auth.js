const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const config = require('config');

const userStorage = require('../storage/userStorage');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Get logged user
// @access  Private
router.get('/', auth, async (req, res) => {
	// we access req.user.id from auth-middelware
	const user = await userStorage.getUserById(req.user.id);
	res.json(user[0]);
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', async (req, res) => {
	const { email, password } = req.body;

	// get the user
	const user = await userStorage.getUserByMail(email);

	// if user doesn't exist
	if (user.length === 0) {
		return res.status(403).json({ msg: 'Invalid eMail or password', success: false });
	}

	//check password
	const match = await bcrypt.compare(password, user[0].password);
	if (!match) {
		return res.status(403).json({ msg: 'Invalid eMail or password', success: false });
	}

	// create payload of JWT
	const payload = {
		user: {
			id: user[0].id
		}
	};
	// sign a JWT
	jwt.sign(payload, config.get('JWT_SECRET'), { expiresIn: 86400 }, (err, token) => {
		if (err) throw err;
		return res.json({ token, success: true });
	});
});

module.exports = router;
