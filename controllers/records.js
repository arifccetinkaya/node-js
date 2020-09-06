const Record = require('../models/Record');
const Response = require('../utils/response');
const asyncHandler = require('../middleware/async');

// @desc Search records
// @route POST /api/v1/records
exports.searchRecords = asyncHandler(async (req, res, next) => {
  if (!req.body.startDate || !req.body.endDate) {
    throw new Error('Bad Request');
  }
  const results = await Record.find()
    .where('createdAt')
    .gte(new Date(req.body.startDate))
    .lte(new Date(req.body.endDate))
    .where('totalCount')
    .gte(req.body.minCount)
    .lte(req.body.maxCount);

  res.status(200).json(new Response(0, 'Success', results));
});
