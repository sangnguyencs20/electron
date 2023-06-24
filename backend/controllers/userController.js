const User = require('../models/userModel');
const express = require("express");

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
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
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };