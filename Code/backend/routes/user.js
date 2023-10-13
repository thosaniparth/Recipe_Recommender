const express = require('express');
const signInRouter = express.Router();
const signUpRouter = express.Router();

const {
    signInGet,
    signUpGet,
    signInPost,
    signUpPost
} = require("../controllers/user");

signInRouter
    .route("/")
    .get(signInGet)
    .post(signInPost)

signUpRouter
    .route("/")
    .get(signUpGet)
    .post(signUpPost)

module.exports = {
    signInRouter,
    signUpRouter
}