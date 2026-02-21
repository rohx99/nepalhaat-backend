const fs = require("fs");

const unlinkAsync = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) reject(err); // Reject promise if error occurs
      resolve(); // Resolve promise if file is deleted successfully
    });
  });
};

module.exports = unlinkAsync;
