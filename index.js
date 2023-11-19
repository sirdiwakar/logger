const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const connectDB = require("./db");

connectDB();
const app = require("./app");

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}.......`);
});
