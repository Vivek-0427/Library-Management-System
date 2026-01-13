const express = require('express');
const router = express.Router();
const {users} = require("../data/users.json");
const { getAllUsers, getSingleUserById, createNewUser, updateUserById, deleteUserById,getSubsriptionDetailsById } = require('../controllers/user-controller');
router.use(express.json());


// router.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         data: users
//     });
// });

router.get('/', getAllUsers);

// router.get('/:id', (req, res) => {
//     const {id} = req.params;
//     const user = users.find((each) => each.id == id);
//     if (!user) {
//         return res.status(404).json({   
//             success: false,
//             message: "User not found"
//         });
//     }
//     res.status(200).json({
//         success: true,
//         data: user
//     });
// });

router.get('/:id', getSingleUserById);

// router.post('/', (req, res) => {

//     const {id, name, surname, email, issuedbook, issueddate, returndate, SubscriptionType, SubscriptionDate} = req.body;

//     if (!id || !name || !surname || !email || !SubscriptionType || !SubscriptionDate || !issuedbook || !issueddate || !returndate) {
//         return res.status(400).json({
//             success: false,
//             message: "All fields are required"
//         });
//     }

//     const user = users.find((each) => each.id === id);
//     if (user) {
//         return res.status(400).json({
//             success: false,
//             message: "User already exists"
//         });
//     }

//     users.push({id, name, surname, email, issuedbook, issueddate, returndate, SubscriptionType, SubscriptionDate});
//     res.status(201).json({
//         success: true,
//         message: "User added successfully"
//     });
// });

router.post('/', createNewUser);

// router.put('/:id', (req, res) => {
//     const {id} = req.params;
//     const {data} = req.body;
//     const user = users.find((each) => each.id == id);
//     if (!user) {
//         return res.status(404).json({
//             success: false, 
//             message: "User not found"
//         });
//     }

//     const updatedUser = users.map((each) => {
//         if (each.id == id) {
//             return {...each, ...data};
//         }
//         return each;
//     });
//     res.status(200).json({
//         success: true,
//         message: "User updated successfully",
//         data: updatedUser
//     });
// });

router.put('/:id', updateUserById);

// router.delete('/:id', (req, res) => {
//     const {id} = req.params;
//     const user = users.find((each) => each.id == id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User not found"
//         });
//     }

//     const updatedUsers = users.filter((each) => each.id != id);
//     res.status(200).json({
//         success: true,
//         message: "User deleted successfully",
//         data: updatedUsers
//     });
// });

router.delete('/:id',deleteUserById);

// router.get('/subscription-Details/:id', (req, res) => {
//     const {id} = req.params;
//     const user = users.find((each) => each.id == id);
//     if (!user) {
//         return res.status(404).json({
//             success: false,
//             message: "User not found"
//         });
//     }

//     const getDateInDays = (data = "") => {
//         let date;
//         if (data) {
//             date = new Date(data);
//         } else {
//             date = new Date();
//         }
//         return Math.floor((date / (1000 * 60 * 60 * 24)));
//     };

//     const subscriptionType =(data) => {
//         if(user.SubscriptionType==="Basic"){
//             data+=90;
//         }
//         else if(user.SubscriptionType==="Premium"){
//             data+=180;
//         }
//         else if(user.SubscriptionType==="Gold"){
//             data+=365;
//         }
//         return data;
//     };

//     let returnDate = getDateInDays(user.returndate);
//     let currentDate = getDateInDays();
//     let subscriptionDate = getDateInDays(user.SubscriptionDate);
//     let subscriptionExpiryDate = subscriptionType(subscriptionDate);

//     const data = {
//         ...user,
//         subscriptionExpired: subscriptionExpiryDate < currentDate,
//         daysLeftForExpiry: subscriptionExpiryDate <= currentDate ? 0 : subscriptionExpiryDate - currentDate,
//         fineAmount: returnDate < currentDate ? (currentDate - returnDate) * 10 : 0
//     };

//     res.status(200).json({
//         success: true,
//         data: data
//     });
// });

router.get('/subscription-Details/:id', getSubsriptionDetailsById);

module.exports = router;