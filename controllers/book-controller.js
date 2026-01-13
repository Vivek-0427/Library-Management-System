const {UserModel, BookModel} = require('../models');

const IssuedBook = require('../DTO\'s/books-dto');

// Controller functions for Book operations

// Get all books

exports.getAllBooks = async (req, res) => {

    const books = await BookModel.find();
    
    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No books found"
        });
    }
    res.status(200).json({
        success: true,
        data: books
    });
};

exports.getSingleBookById = async (req, res) => {
    const {id} = req.params;
    const book = await BookModel.findById(id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    res.status(200).json({
        success: true,
        data: book
    });
};

exports.getAllIssuedBooks = async (req, res) => {
    // $ne means "not equal"
    // why populate is not used here?
    // because we need both book and user details to create IssuedBook DTO
    const issuedUsers = await UserModel.find({issuedBook: {$ne: null}});

    const issuedBooks = issuedUsers.map(each => {
        return new IssuedBook(each);
    });

    if (issuedUsers.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No issued books found"
        });
    }
    
    res.status(200).json({
        success: true,
        data: issuedBooks
    });

};

exports.createNewBook = async (req, res) => {
    const {data} = req.body;
if(!data || Object.keys(data).length === 0){
    return res.status(400).json({
        success: false,
        message: "Book data is required"
    });
}
    const allBooks = await BookModel.create(data);

    res.status(201).json({  
        success: true,
        message: "Book created successfully",
        data: allBooks
    });
};

exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false,
            message: "Book data is required for update"
        });
    }

    const updatedBook = await BookModel.findOneAndUpdate({_id:id}, data, {new: true});
    if (!updatedBook) {
        return res.status(404).json({
            success: false,
            message: "Book not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook
    });
}

exports.deleteBookById = async (req, res) => {
    const {id} = req.params;

    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (!deletedBook) {
        return res.status(404).json({   
            success: false,
            message: "Book not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: deletedBook
    });
};