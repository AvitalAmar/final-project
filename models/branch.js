const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema({
  latitude: {
      type: String,
      required: true,
  },
  
  longitude: {
    type: String,
    required: true,
  },
});

const branchTable = mongoose.model("branches", BranchSchema);

module.exports = branchTable;