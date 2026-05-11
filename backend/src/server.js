require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

const allowedOrigins = [
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (file://, Postman, mobile apps)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // In development allow all origins
      if (process.env.NODE_ENV !== "production") return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "SW Technologies API is running! 🚀" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/quote", require("./routes/quote"));
app.use("/api/admin", require("./routes/admin"));

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
