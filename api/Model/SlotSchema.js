const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  time: {
    type: Date,
  },
});

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
