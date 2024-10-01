const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username : String,
    email : String,
    password : String, // HASH THIS
    created_at : Date,
    updated_at : Date
});

const User = mongoose.model("User", UserSchema);
module.exports = User;