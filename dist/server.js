// import mongoose from "mongoose";
var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
const app = express();
let url = "mongodb+srv://saurav:saurav@booksweb.om1wd.mongodb.net/booksweb?retryWrites=true&w=majority";
let params = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
mongoose
    .connect(url, params)
    .then(() => {
    console.log("Connected to the database");
})
    .catch((err) => {
    console.log("err : " + err.message);
});
app.use(express.json());
app.use(cors());
app.use("/books", require("./routes/booksRoutes"));
app.use("/user", require("./routes/usersRoutes"));
app.listen(3030, () => {
    console.log("Listening at http://localhost:3030");
});
