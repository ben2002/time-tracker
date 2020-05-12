if (process.env.DATABASE_URL) {
	// We are running on Heroku
	module.exports = {
		client: 'pg',
		connection: process.env.DATABASE_URL,
		pool: { min: 1, max: 100 }
	};
} else {
	// Local MySQL
	require('dotenv').config();
	module.exports = {
		client: 'mysql',
		connection: {
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORT,
			database: process.env.MYSQL_DATABASE
		},
		pool: { min: 1, max: 100 }
	};
}
