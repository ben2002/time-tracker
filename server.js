const express = require('express');
const app = express();
require('express-async-errors');

const error = require('./middleware/error');

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/time', require('./routes/time'));
app.use('/api/job', require('./routes/job'));
app.use('/api/auth', require('./routes/auth'));

// Global error handling
app.use(error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
