const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_connection || "mongodb+srv://sushantlakhera2912:01NThero2912@bloghub.n30fnlr.mongodb.net/?retryWrites=true&w=majority" , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

module.exports = connectDB;
