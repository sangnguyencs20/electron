const Document = require('../models/documentModel');

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createDocument = async (req, res) => {
    const document = req.body;
    const newDocument = new Document(document);
    try {
        await newDocument.save();
        res.status(201).json(newDocument);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

const getDocumentById = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await Document.findById(id);
        res.status(200).json(document);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getDocumentOfUser = async (req, res) => {
    const { id } = req.params;
    try {
        const document = await Document.find({ createdBy: id });
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
        const document = await Document.findById(id);
        document.approval = approval;
        await document.save();
        res.status(200).json(document);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateDocument = async (req, res) => {
    const { id } = req.params;
    const { title, content, approval } = req.body;
    try {
        const document = await Document.findById(id);
        document.title = title;
        document.content = content;
        document.approval = approval;
        await document.save();
        res.status(200).json(document);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getDocuments, createDocument, getDocumentById, getDocumentOfUser, updateDocumentApproval, updateDocument };