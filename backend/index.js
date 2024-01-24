const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to db");
    })
    .catch((err) => {
      console.log("Failed");
      process.exit(1);
    });



app.listen(8000, () => {
  console.log("server listening on port 8000");
});
