const express = require('express');
const router = express.Router();

const timeStorage = require('../storage/timeStorage');
const timeService = require('../service/timeService');
const auth = require('../middleware/auth');

// @route   POST api/time
// @desc    Add a new time
// @access  Private
router.post('/:id', auth, async (req, res) => {
	// we access req.user.id from auth-middelware
	const values = {
		from: new Date(),
		job_id: req.params.id,
		user_id: req.user.id
	};
	const timeId = await timeStorage.insert(values).returning('id');
	res.status(200).json({ timeId: timeId[0], success: true });
});

// @route   GET api/time
// @desc    get all job times
// @access  Private
router.get('/:id', auth, async (req, res) => {
	const times = await timeStorage.getAll(req.params.id);
	res.status(200).json({ times, success: true });
});

// @route   GET api/time/total
// @desc    get total time of a job
// @access  Private
router.get('/total/:id', auth, async (req, res) => {
	let totalTimePerJob = await timeStorage.getTotalTimePerJob(req.params.id);
	totalTimePerJob = totalTimePerJob[0]['sum(`duration`)'];
	res.status(200).json({ totalTimePerJob, success: true });
});

// @route   PUT api/time
// @desc    update a stop-time
// @access  Private
router.put('/', auth, async (req, res) => {
	// we access req.user.id from auth-middelware
	// get the highest ID
	const resultId = await timeStorage.selectMaxId(req.user.id);
	const id = resultId[0].id;
	// get the start-time
	const result = await timeStorage.getById(id);
	// convert start-time to Date
	const from = new Date(result[0].from);
	// initialise stop-time
	const to = new Date();
	// substract the Dates and get milliseconds
	const duration = to - from;
	// update db with duration in milliseconds
	const updateValue = { to, duration };
	await timeStorage.update(id, updateValue);
	// convert milliseconds to hh:mm:ss for frontend
	const currentTime = timeService.timeConversion(duration);
	// send duration to client
	res.status(200).json({ currentTime, success: true });
});

// @route   DELETE api/time
// @desc    delete time dataset
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	const result = await timeStorage.deleteById(req.params.id);
	res.status(200).json({ success: true });
});

module.exports = router;
