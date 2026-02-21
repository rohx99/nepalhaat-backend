const crypto = require("crypto");

function generateSlug(text) {
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing -

  // Add a short unique hash for uniqueness
  const uniquePart = crypto.randomBytes(4).toString("hex");
  return `${slug}-${uniquePart}`;
}

module.exports = { generateSlug };
