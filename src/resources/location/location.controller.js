// Customize, add new resources at your confort
const Location = require("./location.modal");
const mongoose = require('mongoose')

module.exports = {
    getOne: async (req, res, next) => {
        // GET: Read Single Resources from here
        const { userID } = req.params
        await Location.findOne({ user: mongoose.Types.ObjectId(userID) })
            .then(doc => {
                console.log(doc)
                return res.status(200).json(doc)
            }).catch(error => {
                console.log(error)
                return res.status(500).json({ message: error.message })
            })
    },
    getAll: async (req, res, next) => {
        // GET: Read ALL Resources from here
        await Location.find()
            .populate('user', 'firstName lastName')
            .then(docs => {
                console.log(docs)
                return res.status(200).json(docs)
            }).catch(error => {
                console.log(error)
                return res.status(500).json({ message: error.message })
            })
    },
    create: async (req, res) => {
        // POST: Create Resources here
        try {
            await Location.create(req.body)
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    update: async (req, res) => {
        // PATCH: Update Resources here
        const { userID } = req.params
        const { lat, lng } = req.body
        await Location.findOneAndUpdate({ user: mongoose.Types.ObjectId(userID) }, { lat, lng }, { new: true, upsert: true })
            .then(updated => {
                console.log(updated)
                return res.status(200).json(updated)
            }).catch(error => {
                console.log(error)
                return res.status(500).json({ message: error.message })
            })

    },
    // Other controllers
    // ...
};
