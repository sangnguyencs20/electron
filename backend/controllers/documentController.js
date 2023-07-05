const {
  handleGetAllAcceptedDocument,
  handleGetASpecificDocumentOfReceiver,
  getAllDocuments,
  createOneDocument,
  getOneDocumentById,
  getAllDocumentsOfUser,
  updateDocumentApprovalStatus,
  handleGetAllDocumentsOfReceiver,
} = require("../services/documents");
const { ObjectId } = require("mongoose").Types;

const { createANewLog } = require("../services/log");

const getDocuments = async (req, res) => {
  try {
    const documents = await getAllDocuments();
    res.status(200).json(documents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getAllAcceptedDocuments = async (req, res) => {
  try {
    const documents = await handleGetAllAcceptedDocument();
    res.status(200).json(documents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createDocument = async (req, res) => {
  if (req.role == "Citizen") {
    return res
      .status(403)
      .json({ message: "You are not authorized to view this content." });
  }
  const document = req.body;
  try {
    const newDocument = await createOneDocument(document);

    //implement something related to blockchain transaction
    const log = {
      documentId: newDocument._id,
      user: newDocument.createdBy,
      action: "CREATE",
      transactionId: "something hashed", // this is transaction hased we will modify later
    };

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
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getDocumentOfUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const document = await getAllDocumentsOfUser(userId);
    res.status(200).json(document);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateDocumentApproval = async (req, res) => {
  if (req.role == "Citizen") {
    return res
      .status(403)
      .json({ message: "You are not authorized to view this content." });
  }
  const { id } = req.params;
  const { approval } = req.body;
  try {
    const document = updateDocumentApprovalStatus(id, approval);
    res.status(200).json(document);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllDocumentsOfReceiver = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }

    const { receiverId } = req.params;
    try {
        const documents = await handleGetAllDocumentsOfReceiver(receiverId);
        res.status(200).json(documents);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const submitDocument = async (req, res) => {
    const { documentId } = req.params;
    const document = await getOneDocumentById(documentId);
    if (!document) {
        return res.status(404).json({ message: 'Document not found' });
    }

    if (document.createdBy._id.toString() !== req.userId) {
        return res.status(401).json({ message: 'You are not authorized to submit this document' });
    }
    if (document.status !== 'Draft') {
        return res.status(401).json({ message: 'You can only submit draft document' });
    }

    document.status = 'Submitted';
    document.timeSubmit = new Date();
    await document.save();
    return res.status(200).json({ message: 'Document submitted successfully' });
}


const submitFeedback = async (req, res) => {
  const { documentId, receiverId } = req.params;
  const { comment, status } = req.body;

  try {
    // Find the document by documentId and receiverId
    const document = await handleGetASpecificDocumentOfReceiver(
      documentId,
      receiverId
    );

    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found for the receiver" });
    }

    // Find the receiver within the document's receiver array
    const receiver = document.receiver.find(
      (receiver) => receiver._id.toString() === receiverId
    );

    if (!receiver) {
      return res
        .status(404)
        .json({ message: "Receiver not found in the document" });
    }

    // Update the comment and time for the receiver
    receiver.status = status;
    receiver.comment = comment;
    receiver.time = new Date();

    await document.save();

    res.status(200).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await getDocumentById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    if (document.createdBy !== req.userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this document" });
    }
    if (document.status !== "Draft") {
      return res
        .status(401)
        .json({ error: "You can only delete draft document" });
    }
    await document.remove();
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  submitDocument,
  getAllAcceptedDocuments,
  getDocuments,
  createDocument,
  getDocumentById,
  getDocumentOfUser,
  updateDocumentApproval,
  getAllDocumentsOfReceiver,
  submitFeedback,
  deleteDocument,
};
