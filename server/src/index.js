require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build", "index.html"));
});
require("./routes")(app);

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
