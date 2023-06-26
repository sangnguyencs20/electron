const Department = require('../models/departmentModel');

const getAllDepartments = async (req, res) => {
    return await Department.find();
}

const createOneDepartment = async (req, res) => {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
}
module.exports = { getAllDepartments, createOneDepartment };
