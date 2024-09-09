const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://prasannagaikwad0018:2doX0XmcSRolWdrI@cluster0.zemrf.mongodb.net/PayTM");
// elegant way to create db schema //
const UserSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,

    },
    Name: {
        type: String,
        required: true,

    },
    LastName: {
        type: String,
        required: true,

    },
    Password: {
        type: String,
        required: true

    }
})

const UserDb = mongoose.model("User", UserSchema);

module.exports = UserDb;

