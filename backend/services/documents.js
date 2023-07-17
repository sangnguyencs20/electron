const Document = require('../models/documentModel');
const Approval = require('../models/approvalModel');
const getAllDocuments = async (req, res) => {
    return await Document.find().populate('createdBy').populate('receiver.receiverId').sort({ _id: -1 });
}

const createOneDocument = async (document) => {
    const newDocument = new Document(document);
    await newDocument.save();
    return newDocument;
}

const getOneDocumentById = async (id) => {
    const document = await Document.findById(id).populate('createdBy').populate('receiver.receiverId').populate('createdBy.department');
    return document;
}

const getAllDocumentsOfUser = async (userId) => {
    const document = await Document.find({ createdBy: userId }).sort({ _id: -1 });
    return document;
}

const updateDocumentApprovalStatus = async (id, approval) => {
    const document = await getOneDocumentById(id);
    document.approval = approval;
    await document.save();
    return document;
}

const handleGetAllDocumentsOfReceiver = async (id) => {
    const documents = await Document.find({
        receiver: { $elemMatch: { receiverId: id } },
        status: { $ne: "Draft" }
    }).populate('receiver.receiverId').sort({ timeSubmit: -1 });
    return documents;
};


const handleGetASpecificDocumentOfReceiver = async (documentId, receiverId) => {
    console.log(documentId, receiverId)
    return await Document.findOne({ _id: documentId, receiver: { $elemMatch: { receiverId: receiverId } } }).populate('createdBy').populate('createdBy.department');
}

const handleGetAllAcceptedDocument = async () => {
    return (await Document.find({ status: 'Approved' }).exec()).sort({ timeSubmit: -1 });
};



const handleGetApprovalOfADocument = async (documentId) => {
    return await Approval.findOne({ documentId: documentId });
}


const handleGetAllDocumentsOfApprover = async (id) => {
    const approvals = await Approval.find({
        history: { $elemMatch: { receiverId: id } },
    }).sort({ _id: -1 });

    return await approvals;
}


module.exports = { handleGetAllDocumentsOfApprover, handleGetApprovalOfADocument, handleGetAllAcceptedDocument, handleGetASpecificDocumentOfReceiver, updateDocumentApprovalStatus, getAllDocuments, getAllDocumentsOfUser, createOneDocument, getOneDocumentById, handleGetAllDocumentsOfReceiver };