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
    const approval = await Approval.findOne({ documentId: documentId });
    return approval;
}

const handlePostAnApprovalOfADocument = async (documentId, userId) => {
    if (await getAnApprovalByDocumentId(documentId)) {
        throw new Error('The approval of this document already exists');
    }


    const approval = new Approval({
        documentId: documentId,
        history: [
            {
                receiverId: userId,
                log: [],
            },
        ],
    });

    await approval.save();
};


const handleAssignAnUserToADocument = async (documentId, userId) => {
    const approval = await getAnApprovalByDocumentId(documentId);

    if (userId.length === 0) {
        throw new Error('Please select a user');
    }

    if (!approval) {
        await handlePostAnApprovalOfADocument(documentId, userId);
        return;
    }
    else if (userId === approval.history[approval.history.length - 1].receiverId) {
        throw new Error('This user is already assigned to this document');
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