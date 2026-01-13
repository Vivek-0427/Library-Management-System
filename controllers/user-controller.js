const {UserModel,BookModel} = require('../models');

exports.getAllUsers = async (req, res) => {

    const users =  await UserModel.find();
    
    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users found"
        });
    }
    res.status(200).json({
        success: true,
        data: users
    });
}

exports.getSingleUserById = async (req, res) => {
    const {id} = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        data: user
    });
}

exports.createNewUser = async (req, res) => {
    const {data} = req.body;
    const user = await UserModel.findOne({id: data.id});
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).json({
            success: false,
            message: "User data is required"
        });
    }
    const newUser = await UserModel.create(data);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
}

exports.updateUserById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;
    if(!data || Object.keys(data).length === 0){
        return res.status(400).json({
            success: false, 
            message: "User data is required for update"
        });
    }
    const updatedUser = await UserModel.findOneAndUpdate({_id:id}, data, {new: true});
    if (!updatedUser) {
        return res.status(404).json({   
            success: false,
            message: "User not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
    });
}

exports.deleteUserById = async (req, res) => {
    const {id} = req.params;

    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
        return res.status(404).json({   
            success: false,
            message: "User not found"
        });
    }   
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
}

exports.getSubsriptionDetailsById = async (req, res) => {
    const {id} = req.params;
    const user =  await UserModel.findById(id);
       if (!user) {
           return res.status(404).json({
               success: false,
               message: "User not found"
           });
       }
   
       const getDateInDays = (data = "") => {
           let date;
           if (data) {
               date = new Date(data);
           } else {
               date = new Date();
           }
           return Math.floor((date / (1000 * 60 * 60 * 24)));
       };
   
       const subscriptionType =(data) => {
           if(user.SubscriptionType==="Basic"){
               data+=90;
           }
           else if(user.SubscriptionType==="Premium"){
               data+=180;
           }
           else if(user.SubscriptionType==="Gold"){
               data+=365;
           }
           return data;
       };
   
       let returnDate = getDateInDays(user.returnDate);
       let currentDate = getDateInDays();
       let subscriptionDate = getDateInDays(user.SubscriptionDate);
       let subscriptionExpiryDate = subscriptionType(subscriptionDate);
   
       const data = {
        
           ...user.toObject(),
           subscriptionExpired: subscriptionExpiryDate < currentDate,
           daysLeftForExpiry: subscriptionExpiryDate <= currentDate ? 0 : subscriptionExpiryDate - currentDate,
           fineAmount: returnDate < currentDate ? (currentDate - returnDate) * 10 : 0
           
        
       };
    
   
       res.status(200).json({
           success: true,
           data: data
         });

};