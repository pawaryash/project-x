const mongoose = require("mongoose");

const connectDatabase = () => {
    if (!process.env.DB_URI) {
        throw new Error("DB_URI is not defined in the environment variables");
    }

    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((db) => {
            console.log(`MongoDB connected with server: ${db.connection.host}`);
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB", err);
            process.exit(1); // Exit the process with a failure code
        });
};

module.exports = connectDatabase;
