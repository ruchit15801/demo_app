const express = require('express');
const db = require("./src/connection/cone")
const bodyParser = require('body-parser');
const userRoute = require("./src/router/user")
const app = express();
db
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use('/user', userRoute)
app.get('/', (req, res) => {
    res.send("It Testing Server")
})

app.listen(3000, () => {
    console.log("Server listening on port 3000");
})