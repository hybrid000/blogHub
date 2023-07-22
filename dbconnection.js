const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect( process.env.DB_connection , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

module.exports = connectDB;
