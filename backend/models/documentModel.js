const mongoose = require('mongoose');


const DocumentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Vui long nhap Trich yeu'],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vui long nhap Nguoi tao'],
    },
    description: {
        type: String,
        required: [true, 'Vui long nhap Noi dung'],
    },
    timeSubmit: {
        type: Date,
        default: null,
    },
    status: {
        type: String,
        enum: ['Draft', 'Submitted', 'Approved', 'Rejected', 'Published', 'Finished'],
        default: 'Draft',
    },
    secretState: {
        type: String,
        enum: ['Low', 'Neutral', 'High'],
        default: 'Neutral',
    },
    urgencyState: {
        type: String,
        enum: ['Low', 'Neutral', 'High'],
        default: 'Neutral',
    },
    fileLink: {
        type: String,
        required: [true, 'Vui long nhap Link file'],
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    timePublished: {
        type: Date,
        default: null,
    },
    timeFinished: {
        type: Date,
        default: null,
    },
    submitTxHash: {
        type: String,
        default: null,
    },
    publishTxHash: {
        type: String,
        default: null,
    },
    finishTxHash: {
        type: String,
        default: null,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Document', DocumentSchema);