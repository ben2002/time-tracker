module.exports = function (error, req, res, next) {
	res.status(500).send({ message: 'Something failed', success: false });
	console.log('Fehler:', error);
};
