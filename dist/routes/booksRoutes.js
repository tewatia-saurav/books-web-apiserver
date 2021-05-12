const bookController = require("../controller/bookController");
// const {authorize} = require ("../controller/userController")
const { authorize } = require('../controller/authorizer');
var express = require("express");
const bookRouter = express.Router();
// bookRouter.get("/",(req:any,res:any)=>res.send('Hello'))
bookRouter.get("/", bookController.getBooks);
bookRouter.get("/:id", bookController.getBookById);
bookRouter.get("/title/:text", bookController.getBooksByTitle);
bookRouter.get("/author/:text", bookController.getBooksByAuthor);
bookRouter.get("/rating/:rating", bookController.getBooksByRating);
bookRouter.get("/priced/:min/:max", bookController.getBooksByPriceRange);
bookRouter.post("/addbook", authorize, bookController.addBook);
bookRouter.delete("/delete/:id", authorize, bookController.deleteBook);
module.exports = bookRouter;
