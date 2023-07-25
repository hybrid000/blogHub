const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

// Import the route files
const mainRoutes = require('./routes/mainRoutes');
const postRoutes = require('./routes/postRoutes');

// Import the Mongoose schema file
const composedPosts = require('./models/composeModel');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);

});

// Add the MongoDB connection code here
const mongooseConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_connection || "mongodb+srv://sushantlakhera2912:01NThero2912@bloghub.n30fnlr.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit the application with a non-zero status code to indicate an error
  }
};

mongooseConnectDB();

// Use the route files
app.use('/post', postRoutes);
app.use('/', mainRoutes);