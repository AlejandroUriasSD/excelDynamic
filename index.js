const express = require("express");
const mongoose = require("mongoose");
const excel = require("./routes/excel");
const bodyParser = require("body-parser");
const authenticate = require("./routes/authenticate");
const jwt = require('jsonwebtoken');
const key = require("./utils/token");


var cors = require('cors');
require('dotenv').config();

//settings
const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "exceldb";

app.use(cors());

// Connect to MongoDB database
mongoose
  .connect(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express();


    //middlewares
    app.use(cors());
    app.use((req, res, next) => {
      if (req.path.startsWith("/api/post")) {
        const token = req.headers.authorization
        if (!token) {
          res.status(401).send({ error: "Acceso Denegado" });
        }
        else {
          const decoded = jwt.verify(token, key.key, (err, result) => {
            if (err) {
              res.status(401).send({ error: err.message });
            } else
              next();
          });
        }
      } else
        next();
    });
    app.use(bodyParser.json());
    //routes
    app.use("/api", excel);
    app.use("/api", authenticate);

    app.listen(PORT, () => {
      console.log("Server has started!");
    });
  });