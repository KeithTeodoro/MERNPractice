const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors middleware

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"],
    credentials: true,
  })
);

//
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the randomIdeas API" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.listen(port, () => console.log(`The app is listening on port ${port}`));
