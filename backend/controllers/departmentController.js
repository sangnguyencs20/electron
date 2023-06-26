const { getAllDepartments, createOneDepartment } = require('../services/departments');

const getDepartments = async (req, res) => {
    try {
        const departments = await getAllDepartments(req, res);
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDepartment = async (req, res) => {
    try {
        const departments = await getAllDepartments(req, res);

        if (departments.length > 0) {
            return res.status(400).json({ message: "Department already exists" });
        }

        await createOneDepartment(req, res);
        res.status(201).json({ message: "Department created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDepartments, createDepartment };