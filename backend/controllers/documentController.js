const {
  handleGetAllAcceptedDocument,
  handleGetASpecificDocumentOfReceiver,
  getAllDocuments,
  createOneDocument,
  getOneDocumentById,
  getAllDocumentsOfUser,
  updateDocumentApprovalStatus,
  handleGetAllDocumentsOfReceiver,
  handleGetApprovalOfADocument,
  handleGetAllDocumentsOfApprover
} = require("../services/documents");

const { handleAssignAnUserToADocument, handleCommentAnApprovalOfADocument } = require("../services/approval");

const { sendMail, createPayloadForSendingReceiver, createPayloadForSendingFeedback } = require("../libs/mail");

const { createANewLog } = require("../services/log");
const { getAllApprovals, checkIfDocumentIsAllApproved } = require("../services/approval");

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
  document.createdBy = req.userId;
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

  const receivers = document.receiver;
  const emailArray = receivers.map(receivers => receivers.receiverId.email);


  const payload = createPayloadForSendingReceiver(emailArray, document);
  sendMail(payload);
  await document.save();
  return res.status(200).json({ message: 'Document submitted successfully' });
}


const submitFeedback = async (req, res) => {
  const { documentId } = req.params;
  const { receiverId, comment, status } = req.body;

  try {
    // Find the document by documentId and receiverId
    const document = await handleGetASpecificDocumentOfReceiver(
      documentId,
      receiverId
    );


    console.log(document)

    if (!document) {
      return res
        .status(404)
        .json({ message: "Document not found for the receiver" });
    }

    // Find the receiver within the document's receiver array
    const receiver = document.receiver.find(
      (receiver) => receiver.receiverId.toString() === receiverId
    );



    if (!receiver) {
      return res
        .status(404)
        .json({ message: "Receiver not found in the document" });
    }

    // Update the comment and time for the receiver

    receiver.push({
      receiverId: receiverId,
      status: status,
      comment: comment,
      time: new Date(),
    })


    const payload = createPayloadForSendingFeedback(status, comment, document);
    sendMail(payload);

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


const publishDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await getDocumentById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    if (document.createdBy !== req.userId) {
      return res
        .status(401)
        .json({ error: "You are not authorized to publish this document" });
    }

    if (checkIfDocumentIsAllApproved(id)) {
      document.isPublished = true;
    }
    else {
      return res.status(401).json({ error: "You can only publish a document when all the feedbacks are approved" });
    }

    await document.save();
    res.json({ message: "Document published successfully" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

const sendDocumentToApprover = async (req, res) => {
  /*
    body: 
    {
      documentId: "documentId",
      approverId: [
        "approverId1",
        "approverId2",
        "approverId3"...
      ],
    }
  */
  const { documentId } = req.params;
  const { approverIds } = req.body;

  try {
    const document = await getOneDocumentById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    if (document.createdBy._id.toString() !== req.userId) {
      return res.status(401).json({ message: 'You are not authorized to send this document' });
    }

    const approvalId = await handleSendToApprover(documentId, approverIds);

    document.approvalId = approvalId;

    await document.save();

    return res.status(200).json({ message: 'Document sent to approver successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const submitFeedbackFromApprover = async (req, res) => {
  const { documentId } = req.params;
  const { receiverId, comment, status } = req.body;
  try {
    const approval = await handleGetApprovalOfADocument(documentId)


    if (!approval) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const receiver = approval.history.find(receiver => receiver.receiverId.toString() === receiverId);


    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found in the document' });
    }
    receiver.log.push({
      status: status,
      time: new Date(),
      comment: comment,
    });


    await approval.save();

    res.status(200).json({ message: "Feedback submitted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const getAllDocumentsOfApprover = async (req, res) => {
  const { id } = req.params;
  try {
    const documents = await handleGetAllDocumentsOfApprover(id);
    if (!documents) {
      return res.status(404).json({ error: "Document not found" });
    }

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

const assignDocumentToApprover = async (req, res) => {
  const { documentId } = req.params;
  try {
    await handleAssignAnUserToADocument(documentId, req.body.userId);
    res.status(200).json({ message: "Document assigned to approver successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const approveADocument = async (req, res) => {
  const { documentId } = req.params;
  const { comment, status } = req.body;
  try {
    await handleCommentAnApprovalOfADocument(documentId, req.userId, comment, status);
    res.status(200).json({ message: "Document approved and commented successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

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
  publishDocument,
  sendDocumentToApprover,
  submitFeedbackFromApprover,
  getAllDocumentsOfApprover,
  assignDocumentToApprover,
  approveADocument
};
