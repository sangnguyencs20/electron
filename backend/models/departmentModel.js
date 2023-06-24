const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui long nhap ten don vi'],
    },
    abbr: {
        type: String,
        required: [true, 'Vui long nhap ten viet tat'],
    },
    address: {
        type: String,
        required: [true, 'Vui long nhap dia chi'],
    },

},
    { timestamps: true },
);

module.exports = mongoose.model('Department', DepartmentSchema);