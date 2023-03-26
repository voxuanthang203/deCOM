const express = require("express");
const app = express();
const transactionRouter = require("./routes/transaction");
const userRouter = require("./routes/user");
const blockchainRouter = require("./routes/blockchain");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

// Enable necessary middlewares
app.use(express.json());

// Use routers
app.use("/transaction", transactionRouter);
app.use("/users", userRouter);
app.use("/blockchain", blockchainRouter);

app.listen(PORT, () => console.log("Listening to port", PORT));
