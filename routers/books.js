const express = require('express');
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const { UserModel, BookModel } = require('../models');

const {getAllBooks, getSingleBookById, getAllIssuedBooks, createNewBook, updateBookById, deleteBookById} = require('../controllers/book-controller');

const router = express.Router();
router.use(express.json());

// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: books
//     });
// });

router.get('/', getAllBooks);

// router.get('/:id', (req, res) => {
//     const {id} = req.params;
//     const book = books.find((each) => each.id == id);
//     if (!book) {
//         return res.status(404).json({   
//             success: false,
//             message: "Book not found"
//         });
//     }
//     res.status(200).json({
//         success: true,
//         data: book
//     });
// });

router.get('/:id',getSingleBookById);

// router.post('/', (req, res) => {

//     const {id,title,author,year,available,price,genre} = req.body;

//     if (!id || !title || !author || !year || !available || !price || !genre) {
//         return res.status(400).json({
//             success: false,
//             message: "All fields are required"
//         });
//     }

//     const book = books.find((each) => each.id == id);
//     if (book) {
//         return res.status(400).json({
//             success: false,
//             message: "Book already exists"
//         });
//     }

//     books.push({id,title,author,year,available,price,genre});
//     res.status(201).json({
//         success: true,
//         message: "Book added successfully",
//         data: books
//     });
// });

router.post('/', createNewBook);

// router.put('/:id', (req, res) => {
//     const {id} = req.params;
//     const {data} = req.body;
//     const book = books.find((each) => each.id == id);
//     if (!book) {
//         return res.status(404).json({
//             success: false, 
//             message: "Book not found"
//         });
//     }

//     const updatedBook = books.map((each) => {
//         if (each.id == id) {
//             return {...each, ...data};
//         }
//         return each;
//     });
//     res.status(200).json({
//         success: true,
//         message: "Book updated successfully",
//         data: updatedBook
//     });
// });

router.put('/:id', updateBookById);

// router.delete('/:id', (req, res) => {
//     const {id} = req.params;
//     const book = books.find((each) => each.id == id);
//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: "Book not found"
//         });
//     }

//     const updatedBooks = books.filter((each) => each.id != id);
//     res.status(200).json({
//         success: true,
//         message: "Book deleted successfully",
//         data: updatedBooks
//     });
// });

router.delete('/:id', deleteBookById);

// router.get('/issued/for-users', (req, res) => {
//     const userWithIsuuedBooks = users.filter((each) => {
//         if(each.issuedbook){
//             return each
//         }
//     });

//     const issuedBooks = [];

//     userWithIsuuedBooks.forEach((each) => {
//         const book = books.find((book) => book.id === each.issuedbook);

//         book.issuedBy = each.name;
//         book.issuedDate = each.issueddate;
//         book.returnDate = each.returndate;
//         issuedBooks.push(book);
//     });

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     });
// });

router.get('/issued/for-users', getAllIssuedBooks);

module.exports = router;