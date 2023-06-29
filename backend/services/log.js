const Log = require('../models/logsModel');

const getAllLogs = async (req, res) => {
    const logs = await Log.find();
    return logs;
}

const createANewLog = async (log) => {
    const newLog = new Log(log);
    await newLog.save();
    return newLog;
}

const getAllLogsByDocumentId = async (documentId) => {
    const logs = await Log.find({ documentId: documentId });
    return logs;
}

const getAllLogsByUserId = async (userId) => {
    const logs = await Log.find({ user: userId });
    return logs;
}

const getAllLogsByOpinionId = async (opinionId) => {
    const logs = await Log.find({ opinionId: opinionId });
    return logs;
}

const getAllLogsByTransactionId = async (transactionId) => {
    const logs = await Log.find({ transactionId: transactionId });
    return logs;
}

module.exports = { getAllLogs, createANewLog, getAllLogsByDocumentId, getAllLogsByUserId, getAllLogsByOpinionId, getAllLogsByTransactionId };