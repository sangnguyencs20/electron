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
    receiver: {
        required: [true, 'Vui long nhap Nguoi nhan'],
        validate: {
            validator: function (array) {
                return array.length > 0;
            },
            message: 'Vui long nhap Nguoi nhan',
        },
        type: [
            {
                receiverId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
                status: {
                    type: String,
                    enum: ['Pending', 'Approved', 'Rejected'],
                    default: 'Pending',
                },
                time: {
                    type: Date,
                    default: Date.now,
                },
                comment: {
                    type: String,
                    required: function () {
                        return this.status === 'Rejected';
                    },
                },
            },
        ],
        default: [],
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
    field: {
        type: String,
        required: [true, 'Vui long nhap Linh vuc'],
    },
    fileLink: {
        type: String,
        required: [true, 'Vui long nhap Link file'],
    }
},
    { timestamp: true, }
)

module.exports = mongoose.model('Document', DocumentSchema);