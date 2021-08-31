// Customize, add new resources at your confort
const Question = require("./question.modal");
const mongoose = require('mongoose')

module.exports = {
    getOne: async (req, res, next) => {
        // GET: Read Single Resources from here
    },
    getUserQuestions: async (req, res) => {
        const { userID } = req.params

        await Question.find({ user: mongoose.Types.ObjectId(userID) })
            .sort('-createdAt')
            .populate('user', 'email firstName lastName')
            .populate('assistedBy', 'firstName lastName email')
            .then(docs => {
                return res.status(200).json(docs)
            }).catch(error => {
                console.log(error)
                return res.status(500).json({ message: 'something went wrong' })
            })
    },
    getQuestionsAnsweredByTutorID: async (req, res) => {
        const { userID } = req.params

        await Question.find({ assistedBy: mongoose.Types.ObjectId(userID) })
            .sort('-createdAt')
            .populate('user', 'email firstName lastName')
            .populate('assistedBy', 'firstName lastName email')
            .then(docs => {
                return res.status(200).json(docs)
            }).catch(error => {
                console.log(error)
                return res.status(500).json({ message: 'something went wrong' })
            })
    },
    getQuestionsCount: async (req, res) => {
        try {
            const { userID } = req.params

            const allQuestions = await Question.countDocuments()
            const assistedBy = await Question.countDocuments({ assistedBy: mongoose.Types.ObjectId(userID) })
            const userQuestions = await Question.countDocuments({ user: mongoose.Types.ObjectId(userID) })
            const data = {
                allQuestions, assistedBy, userQuestions
            }
            return res.status(200).json({ allQuestions, assistedBy, userQuestions })
        } catch (error) {
            return res.status(500).json({ message: 'something went wrong' })
        }
    },
    getAll: async (req, res, next) => {
        // GET: Read ALL Resources from here
        await Question.find()
            .populate('user', 'email firstName lastName')
            .populate('assistedBy', 'firstName lastName email')
            .sort('-createdAt')
            .then(docs => {
                return res.status(200).json(docs)
            })
    },
    create: async (req, res) => {
        // POST: Create Resources here
        await Question.create(req.body).then(doc => {
            return res.status(200).json(doc)
        }).catch(error => {
            console.log(error)
            return res.status(500).json({ message: error.message })
        })
    },
    assignTutor: async (req, res) => {
        const { questionID } = req.params
        const { tutorID } = req.body

        await Question.findByIdAndUpdate(questionID, { assistedBy: tutorID, status: 'active' }, { new: true })
            .populate('assistedBy', 'firstName lastName email')
            .populate('user', 'firstName lastName email')
            .then(doc => {
                return res.status(200).json(doc)
            }).catch(error => {
                console.log(error)
                return res.status(500).json({ message: error.message })
            })
    },
    update: async (req, res) => {
        // PATCH: Update Resources here
    },
    // Other controllers
    // ...
};
