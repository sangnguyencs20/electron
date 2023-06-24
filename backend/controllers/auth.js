const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const {updateRefreshToken, generateTokens} = require('../utils/tokens');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const tokens = generateTokens(user);
        updateRefreshToken(username, tokens.refreshToken);

        return res.status(200).json({ ...tokens, user });
    } catch (error) {
        console.error('Error during login:', error);
        res.sendStatus(500);
    }
};




const logout = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.sendStatus(404);
        }

        user.refreshToken = null;
        await user.save();

        res.sendStatus(204); // send response only once
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // send response only once
    }
};



const signup = async (req, res) => {
    const { username, password, fullName } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword,
            fullName
        });

        await newUser.save();

        const tokens = generateTokens(newUser);
        await updateRefreshToken(username, tokens.refreshToken);

        return res.status(201).json({ ...tokens, newUser });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

module.exports = {
    login,
    signup,
    logout
};