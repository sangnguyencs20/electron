const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    fullName: {
        type: String,
        required: [true, 'Please enter your name']
    },
    dateOfBirth: {
        type: Date,
        required: [true, 'Please enter your date of birth'],
    },
    address: {
        type: String,
        required: [true, 'Please enter your address'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter your phone number'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
    },
    position: {
        type: String,
        //can be Enum if needed
        required: [true, 'Please enter your position'],
    },
    ssn: {
        type: String,
        required: [true, 'Please enter your SSN'],
        unique: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please enter your department'],
        ref: 'Department'
    },
    role: {
        type: String,
        enum: ['User', 'Citizen'],
        required: [true, 'Please enter your role'],
    },
    hashedPrivateKey: {
        type: String,
        required: [true, 'Please enter your hashedPrivateKey'],
    },
    descriptrion: {
        type: String,
    },
    walletAddress: {
        type: String,
        required: [true, 'Please enter your wallet address'],
    }
},
    {
        timestamps: true,
    });

module.exports = mongoose.model('User', UserSchema);