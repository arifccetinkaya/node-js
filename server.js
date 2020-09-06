const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const conn = require('./config/db');
const records = require('./routes/records');

//load env vars
dotenv.config({ path: 'config/config.env' });

//connect to DB
conn.connectDB();

const app = express();

//body parser
app.use(express.json());

//dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//router for rest endpoints
app.use('/api/v1/records', records);

app.use(errorHandler);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //close server exit process
  server.close(() => process.exit(1));
});

module.exports = server;
