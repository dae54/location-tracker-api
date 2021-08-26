// Add Schema properties at your confort
const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
    {
        // Set resource properties here...
        body: {
            type: String,
            trim: false,
        },
        title: {
            type: String,
            trim: false
        },
        tags: [{
            type: String
        }],
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'users',
            required: true
        },
        attachments: [

        ],
        thread: [{
            sender: {
                type: mongoose.Types.ObjectId,
                ref: 'users',
            },
            body: {
                tpe: String
            },
            status: {
                type: String,
                enum: ['read', 'unread', 'delivered', 'pending', 'duplicate'],
                default: 'pending'
            },
            sentAt: {
                type: Date,
                default: Date.now()
            },
            deliveredAt: {
                type: Date,
                default: Date.now()
            }
        }],
        status: {
            type: String,
            enum: ['answered', 'pending'],
            default: 'pending'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("question", questionSchema);


// questionSchema.pre('save', function (next) {
//     var doc = this;

//     questionModel.find

//         counter.findByIdAndUpdate({ _id: 'entityId' }, { $inc: { seq: 1 } }, function (error, counter) {
//             if (error)
//                 return next(error);
//             doc.testvalue = counter.seq;
//             next();
//         });
// });


// module.exports = questionSchema