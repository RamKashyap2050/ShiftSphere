const express = require("express");
const path = require("path");
// console.log(express)
// const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");

const app = express();
app.use(fileUpload()); // Use express-fileupload middleware

const PORT = process.env.PORT;
connectDB();
app.use(bodyParser.json());

app.use("/Admin", require("./routes/AdminRoute"));

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
