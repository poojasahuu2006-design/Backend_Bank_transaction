const mongoose = require("mongoose");

async function connectDB() {
    let mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || process.env.MONGO_URL || process.env.DATABASE_URL;

    if (!mongoUri) {
        console.error("FATAL ERROR: MONGO_URI is missing or undefined!");
        console.error("Please add the MONGO_URI environment variable in your Render dashboard under 'Environment'.");
        process.exit(1);
    }

    // Strip surrounding quotes and whitespace if accidentally pasted in Render
    mongoUri = mongoUri.trim().replace(/^["']|["']$/g, "").trim();

    if (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://")) {
        console.error("FATAL ERROR: Invalid MongoDB connection string format!");
        console.error("Received URI starting with:", mongoUri.substring(0, 10));
        console.error("Expected connection string to start with 'mongodb://' or 'mongodb+srv://'");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("DB is connected successfully to the server");
    } catch (err) {
        console.error("Failed to connect to DB:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
