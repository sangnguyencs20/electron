const Opinion = require('../models/opinionModel');

const getOpinionsByDocumentId = async (documentId) => {
    const opinions = await Opinion.find({ documentID: documentId });
    return opinions;
}

const createANewOpinion = async (opinion) => {
    const newOpinion = new Opinion(opinion);
    await newOpinion.save();
    return newOpinion;
}

module.exports = { getOpinionsByDocumentId, createANewOpinion }

