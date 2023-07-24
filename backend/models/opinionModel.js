const mongoose = require('mongoose');

const OpinionSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Vui long nhap Nguoi tao'],
    },
    documentId : {
        type: mongoose.Types.ObjectId,
        ref: 'Document',
        required: [true, 'Vui long nhap tai lieu'],
    },
    content: {
        type: String,
        required: [true, 'Vui long nhap noi dung'],
    },
    //pdf store
},
{
    timestamps: true,
})

module.exports = mongoose.model('Opinion', OpinionSchema);