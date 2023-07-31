const { getAllLogs, createANewLog, getAllLogsBytxHash, getAllLogsByDocumentId, getAllLogsByOpinionId, getAllLogsByUserId } = require("../services/log")

const getLogs = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    try {
        const logs = await getAllLogs(req, res);
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createLog = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    try {
        const log = {
            user: req.userId,
            documentId: req.body.documentId,
            txHash: req.body.txHash,
            action: req.body.action
        }
        await createANewLog(log);
        res.status(201).json({ message: "Log created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLogsByDocumentId = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    try {
        const logs = await getAllLogsByDocumentId(req, res);
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLogsByUserId = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    try {
        const logs = await getAllLogsByUserId(req, res);
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLogsByOpinionId = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    try {
        const logs = await getAllLogsByOpinionId(req, res);
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLogsBytxHash = async (req, res) => {
    if (req.role == 'Citizen') {
        return res.status(403).json({ message: "You are not authorized to view this content." });
    }
    try {
        const logs = await getAllLogsBytxHash(req, res);
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getLogs, createLog, getLogsByDocumentId, getLogsByUserId, getLogsByOpinionId, getLogsBytxHash };