var Book = require("../models/book");

exports.getBooks = async (req: any, res: any) => {
  let books = await Book.find({});

  if (books) {
    res.status(200).send(books);
  } else {
    res.status(400).send("No data in database");
  }
};

exports.getBookById = async (req: any, res: any) => {
  Book.findOne({ _id: req.params.id }, (err: any, data: any) => {
    if (err) {
      res.status(400).send("Something went wrong");
    } else {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("No Record Found");
      }
    }
  });
};

exports.getBooksByTitle = async (req: any, res: any) => {
  let value = new RegExp(req.params.text);

  let querry = { title: { $regex: value, $options: "i" } };

  Book.find(querry, (err: any, data: any) => {
    if (err) {
      res.status(400).send("Something went wrong");
    } else {
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send("No Record Found");
      }
    }
  });
};
exports.getBooksByAuthor = async (req: any, res: any) => {
  let value = new RegExp(req.params.text);

  let querry = { author: { $regex: value, $options: "i" } };

  Book.find(querry, (err: any, data: any) => {
    if (err) {
      res.status(400).send("Something went wrong");
    } else {
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send("No Record Found");
      }
    }
  });
};

exports.getBooksByRating = (req: any, res: any) => {
  let rating = Number(req.params.rating);

  let querry = { rating: { $gte: rating } };
  Book.find(querry, (err: any, data: any) => {
    if (err) {
      res.status(400).send("Something went wrong");
    } else {
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send("No Record Found");
      }
    }
  });
};

exports.getBooksByPriceRange = (req: any, res: any) => {
  let min = Number(req.params.min);
  let max = Number(req.params.max);

  let querry = { price: { $gte: min, $lte: max } };

  Book.find(querry, (err: any, data: any) => {
    if (err) {
      res.status(400).send("Something went wrong");
    } else {
      if (data.length > 0) {
        res.status(200).send(data);
      } else {
        res.status(404).send("No Record Found");
      }
    }
  });
};

exports.addBook = async (req: any, res: any) => {
  let book = new Book({
    title: req.body.title,
    author: req.body.author,
    rating: req.body.rating,
    price: req.body.price,
    cover: req.body.cover,
    authorpic: req.body.authorpic,
    description: req.body.description,
  });
  book.save((err: any, result: any) => {
    if (err) {
      res.status(400).send("Bad request");
    } else {
  
      res.status(200).send("Created");
    }
  });
};

exports.deleteBook = async (req: any, res: any) => {
  let book = await Book.findOne({ _id: req.params.id });

  if (book) {
    Book.deleteOne(book)
      .then(() => {
        res.status(204).send("No Content");
      })
      .catch((err: any) => {
        res.status(404).send("Not Found");
      });
  }
  else{
    res.status(404).send()
  }
};
