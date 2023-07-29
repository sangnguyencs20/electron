const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Transaction has to have a user'],
        ref: 'User',
    },
    action: {
        type: String,
        enum: ['CREATE', 'SEND', 'SUBMIT', 'APPROVE', 'REJECT', 'DELETE'],
        required: [true, 'Transaction has to have an action (create, update, delete)'],
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Transaction has to have a document id'],
        ref: 'Document',
    },
    opinionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Opinion',
    },
    transactionId: {
        type: String,
        required: [true, 'Transaction has to have a transaction id (get on Blockchain)'],
    },
},
    {
        timestamps: true,
    })

module.exports = mongoose.model('Log', LogSchema);