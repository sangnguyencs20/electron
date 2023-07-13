const Approval = require('../models/approvalModel');

const getAllApprovals = async (documentId) => {
    return await Approval.find({ documentId: documentId });
}

const checkIfAllApproved = async (documentId) => {
    const approvals = await getAllApprovals(documentId);
    return approvals.every((approval) => approval.isApproved);
}



module.exports = {
    getAllApprovals,
    checkIfAllApproved
}