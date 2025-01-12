const express = require('express');
const User = require('../models/user');
const auth = require('../config/auth');

const router = express.Router();

router.get("/", async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render("inventory/index.ejs", {
            currentUser,
            inventory: currentUser.inventory,
        });
        
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.get("/new", (req,res) => {
    res.render("inventory/new.ejs");
});

router.post("/", async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.inventory.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/inventory`);
        
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

module.exports = router;