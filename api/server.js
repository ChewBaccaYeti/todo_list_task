const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const todoRoutes = require("../routes/todoRoutes");

// middlewares
app.use(cors())
    .use(bodyParser.json())
    .use("/todos", todoRoutes)
    .listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
