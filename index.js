const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const urlRoutes = require("./routes/urlRoutes");
const statsRoutes = require("./routes/statsRoutes");
const swaggerDocument = require("./docs/swagger.json");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", urlRoutes);
app.use("/", statsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
