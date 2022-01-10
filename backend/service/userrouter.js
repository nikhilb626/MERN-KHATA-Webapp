const express=require('express');

const {addUser,seedUser,loginUser,logoutUser,loggedInUser,loggedAdminUser}=require("../controller/usercontroller");

const router=express.Router();

router.post('/add',addUser);

router.get('/seed',seedUser); 

router.post("/login",loginUser);

router.get('/logout',logoutUser);

router.get('/loggedIn',loggedInUser);



module.exports=router;