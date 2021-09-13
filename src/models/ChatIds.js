const mongoose = require("mongoose");

const chatIdsSchema = new mongoose.Schema({
    chat_id: Number,
});

module.exports = mongoose.model("ChatIds", chatIdsSchema);
