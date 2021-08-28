// Add Schema properties at your confort
const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
    {
        // Set resource properties here...
        body: {
            type: String,
            trim: false,
            required: true
        },
        title: {
            type: String,
            trim: false,
            required: true
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
        status: {
            type: String,
            enum: ['answered', 'pending', 'active'],
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