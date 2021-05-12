var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Book = require("../models/book");
exports.getBooks = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let books = yield Book.find({});
    if (books) {
        res.status(200).send(books);
    }
    else {
        res.status(200).send([]);
    }
});
exports.getBookById = (req, res) => __awaiter(this, void 0, void 0, function* () {
    Book.findOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(400).send("Something went wrong");
        }
        else {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send("No Record Found");
            }
        }
    });
});
exports.getBooksByTitle = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let value = new RegExp(req.params.text);
    let querry = { title: { $regex: value, $options: "i" } };
    console.log(querry);
    Book.find(querry, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send("Something went wrong");
        }
        else {
            if (data.length > 0) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send("No Record Found");
            }
        }
    });
});
exports.getBooksByAuthor = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let value = new RegExp(req.params.text);
    let querry = { author: { $regex: value, $options: "i" } };
    Book.find(querry, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send("Something went wrong");
        }
        else {
            if (data.length > 0) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send("No Record Found");
            }
        }
    });
});
exports.getBooksByRating = (req, res) => {
    let rating = Number(req.params.rating);
    let querry = { rating: { $gte: rating } };
    Book.find(querry, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send("Something went wrong");
        }
        else {
            if (data.length > 0) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send("No Record Found");
            }
        }
    });
};
exports.getBooksByPriceRange = (req, res) => {
    let min = Number(req.params.min);
    let max = Number(req.params.max);
    let querry = { price: { $gte: min, $lte: max } };
    Book.find(querry, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send("Something went wrong");
        }
        else {
            if (data.length > 0) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send("No Record Found");
            }
        }
    });
};
exports.addBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let book = new Book({
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating,
        price: req.body.price,
        cover: req.body.cover,
        authorpic: req.body.authorpic,
        description: req.body.description,
    });
    book.save((err, result) => {
        if (err) {
            console.log(err);
            res.status(400).send("Bad request");
        }
        else {
            // console.log("Saved")
            res.status(200).send("Created");
        }
    });
});
exports.deleteBook = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let book = yield Book.findOne({ _id: req.params.id });
    if (book) {
        Book.deleteOne(book)
            .then(() => {
            res.status(204).send("No Content");
        })
            .catch((err) => {
            res.status(404).send("Not Found");
        });
    }
    else {
        res.status(404).send();
    }
});
