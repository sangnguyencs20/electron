const Department = require('../models/departmentModel');

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
module.exports = { getAllDepartments, createOneDepartment, getOneDepartmentByAbbr };
