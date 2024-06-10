const express = require('express')
const router = express.Router()
const protect = require('../middlewares/auth.middleware')
const uploads = require('../middlewares/images.middleware')

const {
    signUp,
    confirm,
    login,
    forgotPassword,
    resetPassword,
    confirmReset,
    expiredRegLink
} = require('../controllers/auth.controllers')
const { getEntries, getEntry, createEntry, updateEntry, deleteEntry } = require('../controllers/entry.controllers')

router.post("/register", signUp)
router.get("/verifyAccount", protect, confirm)
router.post("/renewLink", expiredRegLink)
router.post("/login", login)
router.post("/forgotPassword", forgotPassword)
router.get("/confirmReset", protect, confirmReset)
router.post("/resetPassword", protect, resetPassword)

//Entry routes for authorized users

router.get("/myEntries", protect, getEntries)
router.get("/myEntry", protect, getEntry)
router.post("/createEntry", protect, uploads.single('image'), createEntry)
router.put("/updateEntry", protect, uploads.single('image'), updateEntry)
router.delete("/deleteEntry", protect, deleteEntry)

module.exports = router