require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const capsuleRoutes = require("./routes/capsuleRoutes");
const startCapsuleScheduler = require("./jobs/capsuleScheduler");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Time Capsule API is running");
});
app.use("/api/capsules", capsuleRoutes);

const PORT = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    startCapsuleScheduler(); 
  });
});
