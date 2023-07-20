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
                        }
                    }
                ]
            }
        ]
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
})

Approval.pre('save', async function (next) {
    const allApproved = this.history.every((entry) => entry.status === 'Approved');

    // Update isApproved based on the result
    this.isApproved = allApproved;

    next();
})


module.exports = mongoose.model('Approval', Approval);