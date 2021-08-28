// Add Schema properties at your confort
const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        // Set resource properties here...
        sender: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        questionId: {
            type: mongoose.Types.ObjectId,
            ref: 'questions',
            required: true
        },
        body: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['read', 'unread'],
            default: 'unread'
        },
        delivery: {
            status: {
                type: String,
                enum: ['delivered', 'pending'],
                default: 'pending'
            },
            time: {
                type: Date,
            }
        },
        sentAt: {
            type: Date,
            required: true
        },
    },
    { timestamps: true }
);
module.exports = mongoose.model("chat", chatSchema);
