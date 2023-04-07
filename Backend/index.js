require("dotenv").config();
const express = require("express");
const connect = require("./config/db");
const UserRouter = require("./routes/userRouter");
const cors = require("cors");
const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;
app.use(express.json());

//here we creating routes...
app.use("/api", UserRouter);

connect();
app.listen(PORT, () => {
  console.log("server started");
});
