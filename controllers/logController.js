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
  }
};

exports.getAllLogs = async (req, res) => {
  const features = new Features(Log.find(), req.query)
    .filter()
    .sort()
    .limitFields();
  const docs = await features.query;
  console.log(docs);
  res.status(200).json({
    status: "success",
    results: docs.length,
    data: {
      data: docs,
    },
  });
};
