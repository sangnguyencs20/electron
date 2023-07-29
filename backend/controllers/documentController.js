const {
  handleGetPublishedDocument,
  getAllDocuments,
  createOneDocument,
  getOneDocumentById,
  getAllDocumentsOfUser,
  updateDocumentApprovalStatus,
  handleGetApprovalOfADocument,
  handleGetAllDocumentsOfApprover
} = require("../services/documents");

const { handleAssignAnUserToADocument, handleCommentAnApprovalOfADocument, getApprovalHistoryAsTimeline, getAnApprovalByDocumentId } = require("../services/approval");

const { sendMail, createPayloadForSendingReceiver, createPayloadForSendingFeedback } = require("../libs/mail");

const { createANewLog } = require("../services/log");

const { getAllApprovals, checkIfDocumentIsAllApproved } = require("../services/approval");
const { default: mongoose } = require("mongoose");

const getDocuments = async (req, res) => {
  const { page, pageSize } = req.query; // Parse page and pageSize from the request query
  console.log(page, pageSize)
  try {
    const documents = await getAllDocuments(page, pageSize);
    res.status(200).json(documents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const getPublishedDocuments = async (req, res) => {
  const { page, pageSize } = req.query; // Parse page and pageSize from the request query
  try {
    const documents = await handleGetPublishedDocument(page, pageSize);
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
    if (req.body.receiver.length == 0) {
      throw new Error("You have to send this document to someone")
    }
    const newApproval = await handleAssignAnUserToADocument(newDocument._id, req.body.receiver);
    //implement something related to blockchain transaction
    const log = {
      documentId: newDocument._id,
      user: newDocument.createdBy,
      action: "CREATE",
      transactionId: "something hashed", // this is transaction hased we will modify later
    };

    await createANewLog(log);
    res.status(201).json(newApproval);
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
  const { page, pageSize } = req.query; // Parse page and pageSize from the request query
  try {
    const document = await getAllDocumentsOfUser(req.userId, page, pageSize);
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

const submitDocument = async (req, res) => {
  const { documentId } = req.params;
  const { deadlineApprove, transactionId } = req.body;
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

  // const receivers = document.receiver;
  // const emailArray = receivers.map(receivers => receivers.receiverId.email);



  // const payload = createPayloadForSendingReceiver(emailArray, document);
  // sendMail(payload);
  const approval = await getAllApprovals(documentId);
  approval.deadlineApprove = deadlineApprove;
  console.log(deadlineApprove)
  console.log(approval)
  await approval.save();
  await document.save();

  const log = {
    documentId: document._id,
    user: document.createdBy._id,
    action: 'SUBMIT',
    transactionId: transactionId
  }

  await createANewLog(log)
  return res.status(200).json({ message: 'Document submitted successfully' });
}

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
    const document = await getOneDocumentById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    if (document.createdBy._id.toString() !== req.userId) {
      console.log(document.createdBy, req.userId)
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

const getAllDocumentsOfApprover = async (req, res) => {
  try {
    const { page, pageSize } = req.query; // Parse page and pageSize from the request query

    const documents = await handleGetAllDocumentsOfApprover(req.userId, page, pageSize);
    if (!documents) {
      return res.status(404).json({ error: "You have no coming documents!" });
    }
    res.status(200).json(documents);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

const assignDocumentToApprover = async (req, res) => {
  const { documentId, userIds } = req.body;
  try {
    await handleAssignAnUserToADocument(documentId, userIds);
    res.status(200).json({ message: "Document assigned to approver successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const approveADocument = async (req, res) => {

  const { documentId, comment, status } = req.body;

  try {
    const approval = await getAnApprovalByDocumentId(documentId);
    console.log(Date.now(), approval.deadlineApprove)
    if (Date.now() > approval.deadlineApprove) {
      return res.status(401).json({ message: 'Không thể đánh giá dự thảo vì đã quá hạn!' });
    }
    await handleCommentAnApprovalOfADocument(documentId, req.userId, comment, status);
    res.status(200).json({ message: "Document approved and commented successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

const getApprovalHistoryOfDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const approval = await handleGetApprovalOfADocument(documentId);
    if (!approval) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const timeline = await getApprovalHistoryAsTimeline(approval._id);
    res.status(200).json(timeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitDocument,
  getPublishedDocuments,
  getDocuments,
  createDocument,
  getDocumentById,
  getDocumentOfUser,
  updateDocumentApproval,
  deleteDocument,
  publishDocument,
  sendDocumentToApprover,
  getAllDocumentsOfApprover,
  assignDocumentToApprover,
  approveADocument,
  getApprovalHistoryOfDocument
};
