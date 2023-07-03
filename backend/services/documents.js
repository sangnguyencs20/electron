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
    const document = await Document.findById(id).populate('createdBy').populate('receiver');
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
    return await Document.find({ receiver: id });
}

module.exports = { updateDocumentApprovalStatus, getAllDocuments, getAllDocumentsOfUser,  createOneDocument, getOneDocumentById, handleGetAllDocumentsOfReceiver };