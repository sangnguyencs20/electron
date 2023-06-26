const { getAllDocuments, createOneDocument, getOneDocumentById, getAllDocumentsOfUser, updateDocumentApprovalStatus } = require('../services/documents');

const getDocuments = async (req, res) => {
    try {
        const documents = await getAllDocuments();
        res.status(200).json(documents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createDocument = async (req, res) => {
    const document = req.body;
    try {
        const newDocument = await createOneDocument(document);
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await getOneDocumentById(id);
        res.status(200).json(document);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDocumentOfUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const document = await getAllDocumentsOfUser(userId);
        res.status(200).json(document);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateDocumentApproval = async (req, res) => {
    const { id } = req.params;
    const { approval } = req.body;
    try {
        const document = updateDocumentApprovalStatus(id, approval);
        res.status(200).json(document);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


module.exports = { getDocuments, createDocument, getDocumentById, getDocumentOfUser, updateDocumentApproval };