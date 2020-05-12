const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const { check, validationResult } = require('express-validator');

const userStorage = require('../storage/userStorage');

// @route   POST api/user
// @desc    Register a user
// @access  Public
router.post(
	'/',
	[
		check('name', 'Please add name').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ msg: errors.array() });
		}
		const { name, email, password } = req.body;

		const user = await userStorage.getUserByMail(email);
		// ckeck if email already exists
		if (user.length > 0) {
			return res.status(400).json({ msg: 'User already exists', success: false });
		}
		// hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// insert-object
		const values = {
			name,
			email,
			password: hashedPassword
		};
		// insert user in db
		const resultID = await userStorage.insert(values);

		// create payload of JWT
		const payload = {
			user: {
				id: resultID[0]
			}
		};
		// sign a JWT
		jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
			if (err) throw err;
			return res.json({ token, success: true });
		});
	}
);

// @route   DELETE api/user
// @desc    Delete a user
// @access  Public
router.delete('/:id', async (req, res) => {
	const result = await userStorage.deleteById(req.params.id);
	res.status(200).json({ success: true });
});

module.exports = router;
