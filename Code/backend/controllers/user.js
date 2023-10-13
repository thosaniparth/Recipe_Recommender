const express = require('express');
const User = require('../models/user');
const { generateToken } = require("../utils/generateToken");

const signUpGet = async (req, res) => {
    try {
        res.status = 200;
        res.send("Sign up page");
    } catch (err) {
        throw err;
    }  
};

const signUpPost = async (req, res) => {
    try {
        const userExists = await User.findOne({username: req.body.username});
        if (userExists) {
            throw new Error('User already exists');
        }
        const user = User.create({
            username: req.body.username,
            password: req.body.password
        });
        if (user) {
            let token = generateToken(req.body.username);
            res.send(token);
        } else {
            throw new Error('Invalid user data');
        }

    } catch (err) {
        throw err;
    }
}

const signInGet = async (req, res) => {
    try {
        res.send("Sign in page");
    } catch (err) {
        throw err;
    }
}

const signInPost = async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (user) {
            if (await user.matchPassword(req.body.password)) {
                const token  = generateToken(req.body.username);
                res.send(token);
            } else {
                throw new Error('Incorrect username or password');
            }
        } else {
            throw new Error('Incorrect username or password');
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    signInGet,
    signInPost,
    signUpGet,
    signUpPost
};