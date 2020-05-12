const express = require('express');
const router = express.Router();

const jobStorage = require('../storage/jobStorage');
const auth = require('../middleware/auth');

// @route   POST api/job
// @desc    Add a new job
// @access  Private
router.post('/', auth, async (req, res) => {
	const result = await jobStorage.getJobByValue({ title: req.body.title });
	if (result.length > 0) {
		return res.status(400).json({ msg: 'Title already exists' });
	}

	// we access req.user.id from auth-middelware
	const values = {
		user_id: req.user.id,
		title: req.body.title
	};
	// insert job in db
	const resultId = await jobStorage.insert(values);
	let job = await jobStorage.getJobByValue({ id: resultId[0] });
	job = job[0];
	res.status(200).json({ job, success: true });
});

// @route   GET api/job
// @desc    Get all jobs
// @access  Private
router.get('/', auth, async (req, res) => {
	// we access req.user.id from auth-middelware
	const result = await jobStorage.getAll(req.user.id);
	res.status(200).json({ jobs: result, success: true });
});

// @route   PUT api/job/:id
// @desc    update a job
// @access  Private
router.put('/:id', auth, async (req, res) => {
	const result = await jobStorage.getJobByValue({ title: req.body.title });
	if (result.length > 0) {
		return res.status(400).json({ msg: 'Title already exists' });
	}
	const updateValue = { title: req.body.title };
	await jobStorage.update(req.params.id, updateValue);
	let job = await jobStorage.getJobByValue({ id: req.params.id });
	job = job[0];
	res.status(200).json({ job, success: true });
});

// @route   DELETE api/job/:id
// @desc    delete job
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	const result = await jobStorage.deleteById(req.params.id);
	res.status(200).json({ id: req.params.id, success: true });
});

module.exports = router;
