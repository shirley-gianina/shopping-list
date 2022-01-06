const mongoose = require("mongoose");
const Product = require("../models/Product.model");

const data = require("../data/products.json");

require("../config/db.config");

mongoose.connection.once("connected", () => {
  mongoose.connection.db
    .dropDatabase()
    .then(() => {
      console.log("Database cleared");
      return Product.insertMany(data)
    })
    .then((moviesCreated) => console.log(`${moviesCreated.length} movies have been created`))
    .catch((e) => console.error(e))
    .finally(() => {
      mongoose.connection
        .close()
        .then(() => console.log("Finish seeds.js"))
        .catch((e) => console.error(e))
        .finally(() => {
          process.exit(0);
        });
    });
});