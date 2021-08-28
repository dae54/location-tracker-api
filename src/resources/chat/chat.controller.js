// Customize, add new resources at your confort
const Chat = require("./chat.modal");

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
        console.log(req.body)
        req.body.forEach(v => delete v._id);

        await Chat.insertMany(req.body)
            .then(response => {
                console.log(response)
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
