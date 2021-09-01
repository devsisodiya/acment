const express = require("express");
const router = new express.Router();




router.get('/testing', function (req, res) {
    res.status(200).json({ message: "Testing success.!"})
 })



module.exports = router;