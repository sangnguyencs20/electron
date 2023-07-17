const { getAllDepartments, createOneDepartment, getOneDepartmentByAbbr, handleGetAllUsersOfADepartment } = require('../services/departments');

const getDepartments = async (req, res) => {
    try {
        const departments = await getAllDepartments(req, res);
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createDepartment = async (req, res) => {
    const { abbr, name, address } = req.body;
    try {
        const department = await getOneDepartmentByAbbr(abbr);

        console.log(department);

        if (department) {
            return res.status(400).json({ message: "Department already exists" });
        }

        await createOneDepartment(req, res);
        res.status(201).json({ message: "Department created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllUsersOfADepartment = async (req, res) => {    
    try {
        const users = await handleGetAllUsersOfADepartment(req.userId);
        if(!users) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message });
    }
}
module.exports = { getDepartments, createDepartment, getAllUsersOfADepartment };