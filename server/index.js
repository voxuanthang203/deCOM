const express = require("express");
const app = express();
const transactionRouter = require("./routes/transaction");
const userRouter = require("./routes/user");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

// Enable necessary middlewares
app.use(express.json());

// Use routers
app.use("/transaction", transactionRouter);
app.use("/users", userRouter);

app.listen(PORT, () => console.log("Listening to port", PORT));
