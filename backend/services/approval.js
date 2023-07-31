const Approval = require('../models/approvalModel');
const { getOneDocumentById } = require('./documents');

const getAllApprovals = async (documentId) => {
    return await Approval.findOne({ documentId: documentId }).populate('documentId');
}

const checkIfDocumentIsAllApproved = async (documentId) => {
    const approvals = await getAllApprovals(documentId);
    return approvals.isApproved;
}

const getAnApprovalByDocumentId = async (documentId) => {
    const approval = await Approval.findOne({ documentId: documentId });
    return approval;
}

const handlePostAnApprovalOfADocument = async (documentId, userIdArray) => {
    if (await getAnApprovalByDocumentId(documentId)) {
        throw new Error('The approval of this document already exists');
    }

    const approval = new Approval({
        documentId: documentId,
        history: [],
    });

    for (const userId of userIdArray) {
        approval.history.push({
            receiverId: userId,
            log: [],
        });
    }

    await approval.save();
    return approval;
};



const handleAssignAnUserToADocument = async (documentId, userIdArray) => {

    if (userIdArray.length === 0) {
        throw new Error('Please select at least one user');
    }

    const approval = await getAnApprovalByDocumentId(documentId);


    if (!approval) {
        return await handlePostAnApprovalOfADocument(documentId, userIdArray);
    }

    for (const userId of userIdArray) {
        if (userId === approval.history[approval.history.length - 1].receiverId) {
            throw new Error('This user is already assigned to this document');
        }

        approval.history.push({
            receiverId: userId,
            log: [],
        });
    }

    await approval.save();
    return approval;
};




const handleCommentAnApprovalOfADocument = async (documentId, userId, comment, status, txHash) => {
    const approval = await getAnApprovalByDocumentId(documentId);

    // Check if userId exists in receiverId within the approval history
    const historyItem = approval.history.find(history => history.receiverId.toString() === userId);

    console.log(userId);

    if (!historyItem) {
        throw new Error('User is not allowed to give approval');
    }

    historyItem.log.push({
        userId: userId,
        comment: comment,
        status: status,
        txHash: txHash,
    });

    await approval.save();
};


const getApprovalHistoryAsTimeline = async (approvalId) => {
    const approval = await Approval.findById(approvalId).populate('documentId').populate({
        path: 'history.receiverId',
        select: 'fullName position role', // Specify the desired attributes to populate
    });;

    const document = await getOneDocumentById(approval.documentId);

    console.log(document.timeSubmit, document.timeFinished, document.timePublished)

    const timeline = approval.history.map((historyItem) => {
        const receiver = historyItem.receiverId;
        const log = historyItem.log;

        const timelineEvents = log.map((event) => {
            const { status, time, comment, txHash } = event;
            return {
                receiver,
                status,
                time,
                comment,
                txHash
            };
        });

        return timelineEvents;
    });

    // Flatten the timeline array
    const flattenedTimeline = [].concat(...timeline);

    // Sort the timeline events by time in ascending order
    const sortedTimeline = flattenedTimeline.sort((a, b) => b.time - a.time);


    if (document.timeSubmit && document.submitTxHash) {
        sortedTimeline.unshift({
            status: 'Submitted',
            time: document.timeSubmit,
            txHash: document.submitTxHash,
        });
    }

    if (document.timePublished && document.publishTxHash) {
        sortedTimeline.push({
            status: 'Published',
            time: document.timePublished,
            txHash: document.publishTxHash,
        });
    }

    if (document.timeFinished && document.finishTxHash) {
        sortedTimeline.push({
            status: 'Finished',
            time: document.timeFinished,
            txHash: document.finishTxHash,
        });
    }

    return sortedTimeline;
};


module.exports = {
    getAllApprovals,
    checkIfDocumentIsAllApproved,
    handleAssignAnUserToADocument,
    getAnApprovalByDocumentId,
    handleCommentAnApprovalOfADocument,
    handlePostAnApprovalOfADocument,
    handleCommentAnApprovalOfADocument,
    getApprovalHistoryAsTimeline
}