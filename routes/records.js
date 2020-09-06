const express = require('express');
const { searchRecords } = require('../controllers/records');

const router = express.Router();

router.route('/').post(searchRecords);

module.exports = router;
