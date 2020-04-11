const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

const userStorage = require('../storage/userStorage');

// @route   POST api/auth
// @desc    log-in a user
// @access  Public
router.post('/', async (req, res) => {
	const { email, password } = req.body;

	// get the user
	const user = await userStorage.getUser(email);

	// if user doesn't exist
	if (user.length === 0) {
		return res.status(403).json({ msg: 'Invalid eMail', success: false });
	}

	//check password
	const match = await bcrypt.compare(password, user[0].password);
	if (!match) {
		return res.status(403).json({ msg: 'Invalid Password', success: false });
	}

	// sign a JWT
	const payload = {
		user: {
			id: user[0].id
		}
	};
	jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
		if (err) throw err;
		return res.json({ token, success: true });
	});
});

module.exports = router;
