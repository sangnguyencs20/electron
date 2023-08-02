const {
  getOpinionsByDocumentId,
  createANewOpinion,
} = require("../services/opinions");
const { createANewLog } = require("../services/log");
const { getOneDocumentById } = require("../services/documents");

const getOpinionsOfADocument = async (req, res) => {
  const { page, pageSize } = req.query;
  const { documentId } = req.params;
  try {
    console.log(documentId, page, pageSize);
    const opinions = await getOpinionsByDocumentId(documentId, page, pageSize);
    res.status(200).json(opinions);
  } catch {
    res.status(404).json({ message: error.message });
  }
};

const createOpinion = async (req, res) => {
  const userId = req.userId;
  const opinion = req.body;
  
  const comment = {
    documentId: opinion.documentId,
    content: opinion.content,
    createdBy: userId,
    txHash: opinion.txHash
  };

  console.log(comment);
  try {
    const document = await getOneDocumentById(opinion.documentId);
    if (!document) return res.status(404).json({ message: "Document not found" });
    if(document.status !== "Published") {
      return res.status(409).json({ message: "Document is not published" });
    }
    const newOpinion = await createANewOpinion(comment);

    const log = {
      documentId: newOpinion.documentId,
      user: newOpinion.createdBy,
      action: "CREATE",
      txHash: newOpinion.txHash,
    };
    await createANewLog(log);

    await newOpinion.save();

    res.status(201).json({message: "Đóng góp ý kiến thành công!"});
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

module.exports = { getOpinionsOfADocument, createOpinion };
