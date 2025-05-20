const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, 
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/},
  favoriteColor: String,
  birthday: { type: Date }
});

module.exports = mongoose.model("Contact", contactSchema, "contact_w01");
