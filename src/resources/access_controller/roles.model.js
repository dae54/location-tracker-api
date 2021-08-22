const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genericName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("role", RoleSchema);

// type
// if a role is a system defined, the type is 1
// if a role is user defined, the type is 0
