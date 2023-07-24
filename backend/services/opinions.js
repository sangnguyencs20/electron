const Opinion = require('../models/opinionModel');

const getOpinionsByDocumentId = async (documentId, page, pageSize) => {
    const opinions = await Opinion.find({ documentId: documentId });
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + parseInt(pageSize);
    console.log("There are " + opinions.slice(startIndex, endIndex).length + " opinions")
    return {
        totalPages: Math.ceil(opinions.length / pageSize),
        allOpinions: opinions.slice(startIndex, endIndex)
    };
}

const createANewOpinion = async (opinion) => {
    const newOpinion = new Opinion(opinion);
    await newOpinion.save();
    return newOpinion;
}

module.exports = { getOpinionsByDocumentId, createANewOpinion }

