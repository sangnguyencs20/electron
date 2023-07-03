const User = require('../models/userModel');
const {getAllUsers, createOneUser, getOneUserById, updateOneUser, deleteOneUser} = require('../services/user');

const getUsers = async (req, res) => {
    try {
        if (req.role == 'Citizen') {
            return res.status(403).json({ message: "You are not authorized to view this content." });
        }
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    const { id } = req.params;
    const { username, password, fullName, role } = req.body;
    try {
        const user = await User.findById(id);
        if (username) {
            user.username = username;
        }
        if (password) {
            user.password = password;
        }
        if (fullName) {
            user.fullName = fullName;
        }
        if (role) {
            user.role = role;
        }
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser };