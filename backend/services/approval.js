const Approval = require('../models/approvalModel');
const { getOneDocumentById } = require('./documents');

const getAllApprovals = async (documentId) => {
    return await Approval.find({ documentId: documentId });
}

const checkIfAllApproved = async (documentId) => {
    const approvals = await getAllApprovals(documentId);
    return approvals.every((approval) => approval.isApproved);
}

const getAnApprovalByDocumentId = async (documentId) => {
    const approval = await Approval.findOne({documentId: documentId});
    return approval;
}

const handlePostAnApprovalOfADocument = async (documentId, userId) => {
    if (await getOneDocumentById(documentId)) {
        throw new Error('The approval of this document is already exist');
    }
    const approval = await Approval.create({ documentId: documentId, userId: userId});
    await approval.save();
}

const handleAssignAnUserToADocument = async (documentId, userId) => {
    const approval = await getAnApprovalByDocumentId(documentId);
    if (!approval) {
        await handlePostAnApprovalOfADocument(documentId, userId);
        return;
    }
    approval.history.push({
        receiverId: userId,
        log: [],
    })
    await approval.save();
}

const handleCommentAnApprovalOfADocument = async (documentId, userId, comment, status) => {
    const approval = await getAnApprovalByDocumentId(documentId);
    approval.history[approval.history.length - 1].log.push({
        userId: userId,
        comment: comment,
        status: status,
    })
    await approval.save();
}

module.exports = {
    getAllApprovals,
    checkIfAllApproved,
    handleAssignAnUserToADocument,
    getAnApprovalByDocumentId,
    handleCommentAnApprovalOfADocument,
    handlePostAnApprovalOfADocument,
    handleCommentAnApprovalOfADocument
}