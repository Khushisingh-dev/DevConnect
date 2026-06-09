const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://dev-connect-ks.vercel.app/",
  credentials: true
}));

app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("DevConnect API Running");
});

const PORT = process.env.PORT || 5000;

// 🔥 FIRST connect DB, then start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });

  } catch (err) {
    console.log("DB Connection Failed:", err);
  }
};

startServer();