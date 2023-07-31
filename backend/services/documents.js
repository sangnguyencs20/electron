const Document = require("../models/documentModel");
const Approval = require("../models/approvalModel");
const getAllDocuments = async (page, pageSize) => {
  const documents = await Document.find()
    .populate("createdBy")
    .sort({ _id: -1 });
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  console.log(
    "There are " + documents.slice(startIndex, endIndex).length + " documents"
  );
  return {
    totalPages: Math.ceil(documents.length / pageSize),
    allDocuments: documents.slice(startIndex, endIndex),
  };
};

const createOneDocument = async (document) => {
  const newDocument = new Document(document);
  await newDocument.save();
  console.log(newDocument);
  return newDocument;
};

const getOneDocumentById = async (id) => {
  const document = await Document.findById(id)
    .populate("createdBy")
    .populate("createdBy.department");
  return document;
};

const getAllDocumentsOfUser = async (userId, page, pageSize) => {
  const documents = await Document.find({ createdBy: userId }).sort({
    _id: -1,
  });
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  console.log(
    "There are " + documents.slice(startIndex, endIndex).length + " documents"
  );
  return {
    totalPages: Math.ceil(documents.length / pageSize),
    allDocuments: documents.slice(startIndex, endIndex),
  };
};

const updateDocumentApprovalStatus = async (id, approval) => {
  const document = await getOneDocumentById(id);
  document.approval = approval;
  await document.save();
  return document;
};

const handleGetPublishedDocument = async (page, pageSize) => {
  const documents = await Document.find({ isPublished: true }).sort({
    timeSubmit: -1,
  });
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  console.log(
    "There are " + documents.slice(startIndex, endIndex).length + " documents"
  );
  return {
    totalPages: Math.ceil(documents.length / pageSize),
    allDocuments: documents.slice(startIndex, endIndex),
  };
};

const handleGetApprovalOfADocument = async (documentId) => {
  return await Approval.findOne({ documentId: documentId });
};

// const handleGetAllDocumentsOfApprover = async (approverId, page, pageSize) => {
//   const documents = await Approval.find({ "history.receiverId": approverId })
//     .select("documentId history")
//     .populate({
//       path: "documentId",
//       populate: {
//         path: "createdBy",
//         select: "fullName"
//       },
//     })
//     .sort({ createdAt: -1 });
//   const filteredDocuments = documents?.filter((doc) =>
//     doc?.documentId?.status !== "Draft"
//   );

//   const latestLogs = filteredDocuments.map((doc) => {
//     const latestLog = doc.history.sort((a, b) => {
//       return new Date(b.time) - new Date(a.time);
//     })[0];

//     console.log(latestLog)


//     return {
//       document: doc.documentId,
//       currentStatus:
//         latestLog.log.length == 0
//           ? "Pending"
//           : latestLog.log[latestLog.log.length - 1].status,
//     };
//   });

//   // Calculate the starting index and the ending index of the current page
//   const startIndex = (page - 1) * pageSize;
//   const endIndex = startIndex + parseInt(pageSize);
//   // Return the documents for the current page
//   console.log(
//     "There are " + latestLogs.slice(startIndex, endIndex).length + " documents"
//   );

//   return {
//     totalPages: Math.ceil(latestLogs.length / pageSize),
//     allDocuments: latestLogs.slice(startIndex, endIndex),
//   };
// };

const handleGetAllDocumentsOfApprover = async (approverId, page, pageSize) => {
  const documents = await Approval.find({ "history.receiverId": approverId })
    .select("documentId history")
    .populate({
      path: "documentId",
      populate: {
        path: "createdBy",
        select: "fullName"
      },
    })
    .sort({ createdAt: -1 });

  const filteredDocuments = documents?.filter((doc) =>
    doc?.documentId?.status !== "Draft"
  );

  const latestLogs = filteredDocuments.map((doc) => {
    const receiverLog = doc.history.find((log) => log.receiverId.toString() === approverId);
    console.log(receiverLog);
    const currentStatus = (receiverLog !== []) ? receiverLog?.log[receiverLog.log.length - 1]?.status : "Pending";

    return {
      document: doc.documentId,
      currentStatus,
    };
  });

  // Calculate the starting index and the ending index of the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);
  // Return the documents for the current page
  console.log(
    "There are " + latestLogs.slice(startIndex, endIndex).length + " documents"
  );

  return {
    totalPages: Math.ceil(latestLogs.length / pageSize),
    allDocuments: latestLogs.slice(startIndex, endIndex),
  };
};


module.exports = {
  handleGetAllDocumentsOfApprover,
  handleGetApprovalOfADocument,
  handleGetPublishedDocument,
  updateDocumentApprovalStatus,
  getAllDocuments,
  getAllDocumentsOfUser,
  createOneDocument,
  getOneDocumentById,
};
