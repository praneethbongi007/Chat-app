const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({

    createdAt: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    updatedAt: {
        type: mongoose.SchemaTypes.String,
        required: true
    },

    message: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "userModel"
    },
    receiver: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "userModel"
    }
})


module.exports = mongoose.model("messageModal", messageSchema)