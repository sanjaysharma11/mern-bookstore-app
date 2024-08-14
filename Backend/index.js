import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();

// Define port and MongoDB URI
const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// Define routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Serve static files and handle frontend routes in production
if (process.env.NODE_ENV === 'production') {
    const dirPath = path.resolve();
    app.use(express.static(path.join(dirPath, "Frontend", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(dirPath, "Frontend", "dist", "index.html"));
    });
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
