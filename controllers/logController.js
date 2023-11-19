const Log = require("./../models/logs");
const Features = require("./../utils/features");

exports.postLog = async (req, res) => {
  try {
    const newDoc = await Log.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: newDoc,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllLogs = async (req, res) => {
  try {
    const {
      level,
      message,
      resourceId,
      timestamp,
      timestampFrom,
      timestampTo,
      traceId,
      spanId,
      commit,
      parentResourceId,
      sortBy,
      sortOrder,
      page = 1,
      limit = 10,
    } = req.query;

    const filters = {};

    if (level) filters.level = level;
    if (message) filters.message = { $regex: message, $options: 'i' };
    if (resourceId) filters.resourceId = { $regex: resourceId, $options: 'i' };
    if (traceId) filters.traceId = { $regex: traceId, $options: 'i' };
    if (spanId) filters.spanId = { $regex: spanId, $options: 'i' };
    if (commit) filters.commit = { $regex: commit, $options: 'i' };
    if (parentResourceId) filters['metadata.parentResourceId'] = parentResourceId;

    if (timestamp) {
      filters.timestamp = new Date(timestamp);
    }

    // Date Range Filtering
    if (timestampFrom && timestampTo) {
      filters.timestamp = {
        $gte: new Date(timestampFrom), // Greater than or equal to timestampFrom
        $lte: new Date(timestampTo), // Less than or equal to timestampTo
      };
    } else if (timestampFrom) {
      filters.timestamp = { $gte: new Date(timestampFrom) };
    } else if (timestampTo) {
      filters.timestamp = { $lte: new Date(timestampTo) };
    }

    const query = Log.find(filters);

    // Sorting
    if (sortBy) {
      const sortDirection = sortOrder === 'desc' ? -1 : 1;
      query.sort({ [sortBy]: sortDirection });
    }

    // Pagination
    const pageNumber = parseInt(page);
    const limitPerPage = parseInt(limit);
    const startIndex = (pageNumber - 1) * limitPerPage;

    query.skip(startIndex).limit(limitPerPage);

    const filteredLogs = await query.exec();

    // Total count of logs (for pagination)
    const totalCount = await Log.countDocuments(filters);

    // Indicators in response
    const indicators = {
      sortBy: sortBy || 'default', // Indicator for sorting
      sortOrder: sortOrder || 'asc', // Indicator for sort order
      currentPage: pageNumber, // Indicator for current page
      logsPerPage: limitPerPage, // Indicator for logs per page
      totalCount, // Indicator for total count
    };

    res.json({ data: filteredLogs, ...indicators });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
