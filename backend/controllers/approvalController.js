const { getAllApprovals } = require('../services/approval');

const getApprovalsOfADocument = async (req, res) => {
    const { documentId } = req.params;
    try {
        const approvals = await getAllApprovals(documentId);
        res.status(200).json(approvals);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getApprovalsOfADocument
}