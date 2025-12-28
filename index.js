const express = require('express');
const app = express();
const port = 8080;
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to the Library Management System'});
});

// app.all('*', (req, res) => {
//     res.status(404).json({error: 'Route not found'});
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});