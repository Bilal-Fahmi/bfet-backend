const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const index = require("./api/Routes/index");
const admin = require("./api/Routes/AdminRoute");
const morgan = require("morgan");

require("dotenv").config();
console.log(process.env.dbURL);

require("./api/Config/database");

app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.fd],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", index);
app.use("/admin", admin);
app.use("*", (req, res) => {
  res.json({ message: "route not available" });
});
// app.use('/admin',admin)

app.listen(8000, () => {
  console.log("server on port 8000");
});
