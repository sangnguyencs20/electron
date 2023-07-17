const Department = require('../models/departmentModel');
const User = require('../models/userModel');
const getAllDepartments = async (req, res) => {
    return await Department.find();
}

const getOneDepartmentByAbbr = async (abbr) => {
    try {
        const department = await Department.findOne({ abbr: abbr });
        return department;
    } catch (error) {
        throw new Error("Error retrieving department by abbreviation");
    }
};


const createOneDepartment = async (req, res) => {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
}

const handleGetAllUsersOfADepartment = async (userId) => {
    try {
        const user = await User.findById(userId);
        const department = await Department.findById(user.department);
        const users = await User.find({ department: department._id.toString()});
        return users;
    } catch (error) {
        throw new Error("Error retrieving users of a department");
    }
}
module.exports = { handleGetAllUsersOfADepartment, getAllDepartments, createOneDepartment, getOneDepartmentByAbbr };
