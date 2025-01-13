const express = require('express');
const User = require('../models/user');
const auth = require('../config/auth');
const user = require('../models/user');

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

router.get("/new", async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render("inventory/new.ejs", {currentUser});
        
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
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

router.get("/:productId/edit", async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const product = await currentUser.inventory.id(req.params.productId);
        res.render("inventory/edit.ejs", {
            product,
        });
        
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.put("/:productId", async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const product = await currentUser.inventory.id(req.params.productId);
        product.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${user._id}/inventory`);

    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

router.delete("/:productId", async (req,res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.inventory.id(req.params.productId).deleteOne();
        await currentUser.save();
        res.redirect(`/users/${user._id}/inventory`);
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
});

module.exports = router;