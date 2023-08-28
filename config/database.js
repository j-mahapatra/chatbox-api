const mongoose = require('mongoose');

function connectToDb(URI) {
  mongoose
    .connect(URI)
    .then((conn) => {
      console.log(`MongoDB connected : ${conn.connection.host}`);
    })
    .catch((error) => {
      console.error(`ERROR: ${error.message}`);
    });
}

module.exports = { connectToDb };
