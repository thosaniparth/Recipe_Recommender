const express = require('express');
const signInRouter = express.Router();
const signUpRouter = express.Router();
const signOutRouter = express.Router();

const {
    signInGet,
    signUpGet,
    signInPost,
    signUpPost,
    signOutGet
} = require("../controllers/user");

signInRouter
    .route("/")
    .get(signInGet)
    .post(signInPost)

signUpRouter
    .route("/")
    .get(signUpGet)
    .post(signUpPost)

signOutRouter
    .route("/")
    .get(signOutGet)

module.exports = {
    signInRouter,
    signUpRouter,
    signOutRouter
}