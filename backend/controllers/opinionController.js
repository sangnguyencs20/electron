const Opinion = require('../models/opinionModel');

const getOpinionsOfADocument = async (req, res) => {
    const { documentId } = req.params;
    try {
        const opinions = await Opinion.find({ documentID: documentId });
        res.status(200).json(opinions);
    }
    catch {
        res.status(404).json({ message: error.message });
    }
}

const createOpinion = async (req, res) => {
    const opinion = req.body;
    const newOpinion = new Opinion(opinion);
    try {
        await newOpinion.save();
        res.status(201).json(newOpinion);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports = {getOpinionsOfADocument, createOpinion}