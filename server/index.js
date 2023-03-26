const express = require("express");
const app = express();
const userRouter = require("./routes/user");

const PORT = process.env.PORT || 8080;

// Enable necessary middlewares
app.use(express.json());

// Use routers
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => console.log("Listening to port", PORT));
