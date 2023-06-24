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
    receiver: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
        required: [true, 'Vui long nhap Nguoi nhan'],
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
    }
    /// store pdf
},
    { timestamp: true, }
)

module.exports = mongoose.model('Document', DocumentSchema);