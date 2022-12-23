const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    sentMessages: {

        type: [mongoose.SchemaTypes.ObjectId],
        required: false,
        ref: "messageModel"
    },
    receivedMessages: {

        type: [mongoose.SchemaTypes.ObjectId],
        required: false,
        ref: "messageModel"
    }
})

module.exports = mongoose.model("userModel", userSchema);