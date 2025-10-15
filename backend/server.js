// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
MONGO_URI="mongodb+srv://infocsmwangi_db_user:NbuN!4vPcyZNgxy%40cluster0.9i9ihrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(process.env.MONGO_URI);
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err));


// Test route
app.get("/", (req, res) => {
  res.send("Portfolio API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
