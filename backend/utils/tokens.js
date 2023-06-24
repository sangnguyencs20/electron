const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const updateRefreshToken = async (username, refreshToken) => {
    try {
        const user = await User.findOneAndUpdate(
            { username },
            { refreshToken },
            { new: true }
        );

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};



const generateTokens = payload => {
    const { id, username } = payload;
    const accessToken = jwt.sign({ id, username }, process.env.ACCESS_TOKEN_SECRET);

    const refreshToken = jwt.sign({ id, username }, process.env.REFRESH_TOKEN_SECRET);

    return { accessToken, refreshToken };
};

module.exports = { updateRefreshToken, generateTokens };