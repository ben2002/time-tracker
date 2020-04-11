const express = require('express');
const router = express.Router();

const jobStorage = require('../storage/jobStorage');
const auth = require('../middleware/auth');

// @route   POST api/job
// @desc    Add a new job
// @access  Private
router.post('/', auth, async (req, res) => {
	// we access req.user.id from auth-middelware
	const values = {
		user_id: req.user.id,
		title: req.body.title
	};
	// insert job in db
	await jobStorage.insert(values);
	res.status(200).json({ success: true });
});

// @route   GET api/job
// @desc    Get all jobs
// @access  Private
router.get('/', auth, async (req, res) => {
	// we access req.user.id from auth-middelware
	const result = await jobStorage.getAll(req.user.id);
	res.status(200).json({ result, success: true });
});

module.exports = router;
