import "dotenv/config";

import express from "express";
import cors from "cors";
import userRoutes from "./router/routes.js";
import { connectDB } from "./database/database.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "*", // Allow all origins (for testing)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }));
  
app.use("/auth", userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`server is running on http:localhost:${PORT}`);
});
