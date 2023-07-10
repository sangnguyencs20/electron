const Document = require('../models/documentModel');

const getAllDocuments = async (req, res) => {
    return await Document.find().populate('createdBy').populate('receiver');
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
    const document = await Document.find({ createdBy: userId });
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
        receiver: { $elemMatch: { _id: id } },
        status: { $ne: "Draft" }
    }).populate('receiver.receiverId');
    return documents;
};
const handleGetASpecificDocumentOfReceiver = async (documentId, receiverId) => {
    console.log(documentId, receiverId)
    return await Document.findOne({ _id: documentId, receiver: { $elemMatch: { receiverId: receiverId } } }).populate('createdBy').populate('createdBy.department');
}

const handleGetAllAcceptedDocument = async () => {
    return await Document.find({ status: 'Approved' }).exec();
};
module.exports = { handleGetAllAcceptedDocument, handleGetASpecificDocumentOfReceiver, updateDocumentApprovalStatus, getAllDocuments, getAllDocumentsOfUser, createOneDocument, getOneDocumentById, handleGetAllDocumentsOfReceiver };