const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const index = require("./api/Routes/index");
const admin = require("./api/Routes/AdminRoute");
const morgan = require("morgan");
const cron = require("node-cron");
const helmet = require("helmet")
const { sendVideoLinkToEmail } = require("./api/Utils/VClinkScheduler");

require("dotenv").config();
console.log(process.env.dbURL);

require("./api/Config/database");

app.use(helmet())
app.use(morgan("dev"));
console.log(__dirname);

cron.schedule("0 7 * * *", () => {
  sendVideoLinkToEmail()
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "25mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/api/Public")));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.use("/", index);
app.use("/admin", admin);
app.use("*", (req, res) => {
  res.json({ message: "route not available" });
});

app.listen(8000, () => {
  console.log("server on port 8000");
});
