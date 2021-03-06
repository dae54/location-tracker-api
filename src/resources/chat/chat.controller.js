// Customize, add new resources at your confort
const Chat = require("./chat.modal");
const mongoose = require('mongoose')
module.exports = {
    getOne: async (req, res, next) => {
        // GET: Read Single Resources from here
    },
    getAll: async (req, res, next) => {
        // GET: Read ALL Resources from here
    },
    getQuestionsThread: async (req, res) => {
        const { questionId } = req.params
        await Chat.find({ questionId })
            .then(response => res.status(200).json(response))
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    },
    getQuestionsLatestMessage: async (req, res) => {
        await Chat.find({ questionId })
            .then(response => res.status(200).json(response))
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    },
    getQuestionsLatestMessage: async (req, res) => {
        const { questionId } = req.params
        const { lastMessageSentAt, currentUser } = req.query
        // console.log(lastMessageSentAt)
        // console.log(currentUser)

        await Chat.find({ questionId, sentAt: { $gt: lastMessageSentAt }, sender: { $ne: mongoose.Types.ObjectId(currentUser) } })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ message: error.message })
            })
    },
    create: async (req, res) => {
        // POST: Create Resources here
        await Chat.create(req.body)

            .then(response => res.status(200).json(response))
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    },
    syncOffineMessages: async (req, res) => {
        // POST: Create Resources here
        req.body.forEach(v => delete v._id);

        await Chat.insertMany(req.body)
            .then(response => {
                res.status(200).json(response)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({ message: error.message })
            })
    },
    update: async (req, res) => {
        // PATCH: Update Resources here
    },
    // Other controllers
    // ...
};
