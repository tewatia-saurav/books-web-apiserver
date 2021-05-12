// const mongoose = require('mongoose')
// import mongoose from 'mongoose'
var mongoose = require("mongoose");
var Book = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    authorpic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});
module.exports = mongoose.model("Book", Book);
