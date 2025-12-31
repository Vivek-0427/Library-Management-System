const express = require('express');
const app = express();
const userRouter = require('./routers/users');
app.use('/users', userRouter);
const booksRouter = require('./routers/books');
app.use('/books', booksRouter);
// const {users} = require("./data/users.json");
const port = 8080;
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Library Management System'});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});