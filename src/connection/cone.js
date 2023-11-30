const mongoose = require('mongoose')
const express = require('express')
const connection = mongoose.connect("mongodb://0.0.0.0:27017/test").then(() => console.log("Connection successfully"))

module.exports = connection