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
    deadlineApprove: {
        type: Date,
        required: [true, 'Vui long nhap thoi han duyet'],
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
})

Approval.pre('save', async function (next) {
    const histories = this.history;

    if (!histories || histories.length === 0) {
        this.isApproved = false;
        next();
        return;
    }
    // Loop through each history entry
    for (const entry of histories) {
        const logs = entry.log;

        if (!logs || logs.length === 0) {
            this.isApproved = false;
            next();
            return;
        }
        // Get the last log entry for each receiver
        const lastLogEntry = logs[logs.length - 1];

        // Check if the last status for the receiver is not "Approved", then stop checking and set isApproved to false
        if (lastLogEntry.status !== 'Approved') {
            this.isApproved = false;
            next();
            return;
        }
    }

    // If all the last statuses for each receiver are "Approved", set isApproved to true
    this.isApproved = true;
    next();
});



module.exports = mongoose.model('Approval', Approval);