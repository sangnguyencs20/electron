const Document = require('../models/documentModel');
const Approval = require('../models/approvalModel');
const getAllDocuments = async (req, res) => {
    return await Document.find().populate('createdBy').sort({ _id: -1 });
}

const createOneDocument = async (document) => {
    const newDocument = new Document(document);
    await newDocument.save();
    return newDocument;
}

const getOneDocumentById = async (id) => {
    const document = await Document.findById(id).populate('createdBy').populate('createdBy.department');
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




const handleGetAllAcceptedDocument = async () => {
    return (await Document.find({ status: 'Approved' }).exec()).sort({ timeSubmit: -1 });
};



const handleGetApprovalOfADocument = async (documentId) => {
    return await Approval.findOne({ documentId: documentId });
}

module.exports = { handleGetApprovalOfADocument, handleGetAllAcceptedDocument, updateDocumentApprovalStatus, getAllDocuments, getAllDocumentsOfUser, createOneDocument, getOneDocumentById };