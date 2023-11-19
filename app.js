const express = require("express");
const morgan = require('morgan')
const logController = require("./controllers/logController");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(morgan('combined'))
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.post("/logs", logController.postLog);
app.get("/logs", logController.getAllLogs);
module.exports = app;
