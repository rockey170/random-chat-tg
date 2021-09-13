const mongoose = require("mongoose");

const roomsSchema = new mongoose.Schema({
    room: [Number],
});

module.exports = mongoose.model("Rooms", roomsSchema);
