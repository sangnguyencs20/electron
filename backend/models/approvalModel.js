const mongoose = require('mongoose')

const Approval = new mongoose.Schema({
    documentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Document',
        required: [true, 'Vui long nhap Id van ban'],
    },
    history: {
        type: [
            {
                receiverId: {
                    type: mongoose.Types.ObjectId,
                    ref: 'User',
                },
                log: [
                    {
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
                            default: '',
                        },
                        txHash: {
                            type: String,
                            required: [true, 'Vui long nhap txHash'],
                        }
                    }
                ]
            }
        ]
    },
    deadlineApprove: {
        type: Date,
        // required: [true, 'Vui long nhap thoi han duyet'],
        default: null
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
})



module.exports = mongoose.model('Approval', Approval);