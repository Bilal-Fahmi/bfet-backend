const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  expert: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  time: {
    type: Date,
  },
});

const Slot = mongoose.model("Slot", slotSchema);
module.exports = Slot;
