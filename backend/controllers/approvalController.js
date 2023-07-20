const { getAllApprovals, handlePostAnApprovalOfADocument, handleAssignAnUserToADocument
} = require('../services/approval');

const getApprovalsOfADocument = async (req, res) => {
    const { documentId } = req.params;
    try {
        const approvals = await getAllApprovals(documentId);
        res.status(200).json(approvals);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const postAnApprovalOfADocument = async (req, res) => {
    const { documentId } = req.params;
    const { userId, status, content } = req.body;
    try {
        await handlePostAnApprovalOfADocument(documentId, userId);
        return res.status(200).json({ message: 'Approval successfully' });
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = {
    getApprovalsOfADocument,
    postAnApprovalOfADocument,
}