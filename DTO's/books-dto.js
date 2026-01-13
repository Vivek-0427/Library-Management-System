class IssuedBook{
    title;
    author;
    genre;  
    price;
    year;
    available;
    issuedTo;
    issuedDate;
    returnDate;
// book in constructor is the book document from books collection
// user in constructor is the user document from users collection
// both are passed when creating an instance of IssuedBook

    constructor(book, user){
        this.title = book.title;
        this.author = book.author;
        this.genre = book.genre;
        this.price = book.price;
        this.year = book.year;
        this.available = book.available;
        this.issuedTo = `${user.name} ${user.surname}`;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }
}