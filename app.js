const express = require("express");
const logController = require("./controllers/logController");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.post("/", logController.postLog);
app.get("/", logController.getAllLogs);
module.exports = app;
