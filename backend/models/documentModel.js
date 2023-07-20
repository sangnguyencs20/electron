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
        enum: ['Draft', 'Submitted', 'Approved', 'Rejected'],
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
        // validate: {
        //     validator: async function (value) {
        //         // If the document is a draft (no approvalId), allow publishing
        //         if (!this.approvalId) {
        //             return true;
        //         }

        //         // Retrieve the associated approval document
        //         const approval = await mongoose.model('Approval').findOne({ _id: this.approvalId });

        //         // Check if the approval exists and is approved
        //         return approval && approval.isApproved === true;
        //     },
        //     message: 'The document can only be published if it is approved.',
        // },
    },
},
    { timestamp: true, }
)

module.exports = mongoose.model('Document', DocumentSchema);