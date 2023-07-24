const { getOpinionsByDocumentId, createANewOpinion } = require('../services/opinions');
const { createANewLog } = require('../services/log');


const getOpinionsOfADocument = async (req, res) => {
    const { page, pageSize } = req.query;
    const { documentId } = req.params;
    try {
        const opinions = await getOpinionsByDocumentId(documentId, page, pageSize);
        res.status(200).json(opinions);
    }
    catch {
        res.status(404).json({ message: error.message });
    }
}

const createOpinion = async (req, res) => {
    const userId = req.userId;
    const opinion = req.body;
    const comment = {
        "documentId": opinion.documentId,
        "content": opinion.content,
        "createdBy": userId,
    }
    try {
        const newOpinion = await createANewOpinion(comment);
        const log = {
            "documentId": newOpinion.documentId,
            "user": newOpinion.createdBy,
            "action": "CREATE",
            "transactionId": "something hashed"
        }
        await createANewLog(log);
        await newOpinion.save();
        res.status(201).json(newOpinion);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = { getOpinionsOfADocument, createOpinion }