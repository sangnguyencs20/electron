const { getAllDocuments, createOneDocument, getOneDocumentById, getAllDocumentsOfUser, updateDocumentApprovalStatus, handleGetAllDocumentsOfReceiver } = require('../services/documents');

const { createANewLog } = require('../services/log');

const getDocuments = async (req, res) => {
    try {
        const documents = await getAllDocuments();
        res.status(200).json(documents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createDocument = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    const document = req.body;
    try {
        const newDocument = await createOneDocument(document);


        //implement something related to blockchain transaction
        const log = {
            "documentId": newDocument._id,
            "user": newDocument.createdBy,
            "action": "CREATE",
            "transactionId": "something hashed" // this is transaction hased we will modify later
        }


        
        await createANewLog(log);
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
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    const { id } = req.params;
    const { approval } = req.body;
    try {
        const document = updateDocumentApprovalStatus(id, approval);
        res.status(200).json(document);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getAllDocumentsOfReceiver = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    const { receiverId } = req.params;
    console.log(receiverId)
    try {
        const documents = await handleGetAllDocumentsOfReceiver(receiverId);
        res.status(200).json(documents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getDocuments, createDocument, getDocumentById, getDocumentOfUser, updateDocumentApproval, getAllDocumentsOfReceiver };