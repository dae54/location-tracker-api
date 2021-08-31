// Add Schema properties at your confort
const mongoose = require("mongoose");

const locationSchema = mongoose.Schema(
    {
        // Set resource properties here...
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        lat: {
            type: Number,
            required: true,
            trim: true
        },
        lng: {
            type: Number,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model("location", locationSchema);
