module.exports = function (error, req, res, next) {
	res.status(500).send({ msg: 'Internal Server error', success: false });
	console.log('Fehler:', error);
};
