const express = require("express");
const app = express();

// External modules
const cookieParser = require("cookie-parser");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}` });

// Database connection
const db = require("./config/mongoose-connection");

// Routes
const indexRouter = require("./routes/index");
const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(cookieParser());

// Session configuration (required for flash)
app.use(
  session({
    secret: process.env.SECRET_KEY || "anything",
    resave: false,
    saveUninitialized: false,
  })
);

// Flash configuration
app.use(flash());

// Route setup
app.use("/", indexRouter);
app.use("/owner", ownerRouter);
app.use("/products", productRouter);
app.use("/users", userRouter);

// Error handling (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
