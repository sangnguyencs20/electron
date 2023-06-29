const mongoose = require('mongoose');
const LogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Transaction has to have a user'],
    },
    action: {
        type: String,
        enum: ['CREATE', 'SEND'],
        required: [true, 'Transaction has to have an action (create, update, delete)'],
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Transaction has to have a document id'],
    },
    opinionId: {
        type: mongoose.Schema.Types.ObjectId,
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