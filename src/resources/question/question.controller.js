// Customize, add new resources at your confort
const Question = require("./question.modal");
const mongoose = require('mongoose')

module.exports = {
    getOne: async (req, res, next) => {
        // GET: Read Single Resources from here
    },
    getUserQuestions: async (req, res) => {
        console.log(req.params)
        const { userID } = req.params

        await Question.find({ user: mongoose.Types.ObjectId(userID) })
            .populate('user', 'email firstName lastName')
            .sort('asc')
            .then(docs => {
                return res.status(200).json(docs)
            }).catch(error => {
                console.log(error)
                return res.status(500).json({ message: 'something went wrong' })
            })
    },
    getAll: async (req, res, next) => {
        // GET: Read ALL Resources from here
        await Question.find()
            .populate('user', 'email fullName')
            .then(docs => {
                return res.status(200).json(docs)
            })
    },
    create: async (req, res) => {
        // POST: Create Resources here
        console.log(req.body)
        await Question.create(req.body).then(doc => {
            console.log(doc)
            return res.status(200).json(doc)
        })
    },
    update: async (req, res) => {
        // PATCH: Update Resources here
    },
    // Other controllers
    // ...
};
