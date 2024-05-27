const express = require('express');

const router = express.Router();
const User = require('../models/users')
const property = require('../models/property')
const {jwtAuthMiddleware, generateToken} = require('../auth');
const querystring = require('querystring'); 


// registartion route
router.post('/signup', async (req, res) => {
    try{
       const data = req.body;
       const newPerson = new User(data);
       newPerson.role = 'seller';
       const savedPerson = await newPerson.save();
       console.log("Seller Registered Successfully");
       req.flash('message', "Registered Successfully !!!")
       return res.redirect('/seller/signup')
    }
    catch(err){
       console.log("error", err)
       req.flash('message', "User not Registered !!!")
       return res.redirect('/seller/signup');
    } 
 })

 //login route
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email})
        if( !user || user.role === "buyer" || !(await user.comparePassword(password))){
            req.flash('message', "Invalid Email or Password");
            return res.redirect('./login');
        }
        //generate Token 
        const user_name = user.first_name+ " " +user.last_name;
        const payload = {
            id: user.id,
            role:user.role,
            name:user_name
        }
        const token = generateToken(payload);
        res.cookie("access_token", token, { httpOnly: true, expiresIn: "1h" });
        res.redirect('/seller/profile')
     }
     catch(err){
        console.log(err);
        req.flash('error', err);
        res.redirect('./')
     } 
 })





 router.get('/profile',jwtAuthMiddleware, async (req, res) =>{
    try{
        if(req.user.role === 'buyer'){
            req.flash('message', "User is not authorize to acces this Page, create seller account");
            return res.redirect('/login')
        }
        const properties = await property.find({user:req.user.id});
        context = {properties}
        context['token'] = req.cookies.access_token;
        context['user_name'] = req.user.name;
        const query = querystring.stringify({
            "name":req.user.name,
            "id":req.user.id
        });
        context['query'] = query
        context["messages"] = req.flash('message')
        console.log(context)
        return res.render('sellerView/profile', context)
    }
    catch(err){
        console.log(err)
        req.flash('message', err)
        return res.redirect('/seller/login')
    }   
})


//seller can add properies
router.post('/add', jwtAuthMiddleware, async (req, res) => {
    try{
        if(req.user.role === 'buyer'){
            req.flash('message', "User is not authorize to acces this Page, create seller account");
            return res.redirect('/login')
        }
       const data = req.body;
       const newProperty = new property(data);
       newProperty.user = req.user.id;
       const savedProperty = await newProperty.save();
       console.log("data saved");
       req.flash('message', "Property added successfully !!!!!!");
       return res.redirect('./profile')
    }
    catch(err){
        req.flash('message', err)
        return res.redirect('./profile')
    } 
 })


 //delete property
 router.get('/:propertyID',jwtAuthMiddleware, async (req, res)=>{
    try{
        if(req.user.role === 'buyer'){
            req.flash('message', "User is not authorize to acces this Page, create seller account");
            return res.redirect('/login')
        }
        const propertyID = req.params.propertyID; // Extract the id from the URL parameter
        const response = await property.findByIdAndDelete(propertyID);

        if (!response) {
            throw "Property data not found"
        }
        console.log('property deleted');
        req.flash('message', "Property Deleted successfully !!!!!!");
        return res.redirect('./profile')
    }catch(err){
        req.flash('message', err)
        return res.redirect('./profile')
    }
})

//update property
router.post('/update/:propertyID', jwtAuthMiddleware,async (req, res)=>{
    try{   
        const user = await User.findOne({_id:req.user.id})
        if(req.user.role === 'buyer'){
            req.flash('message', "User is not authorize to acces this Page, create seller account");
            return res.redirect('/login')
        }
        const propertyID = req.params.propertyID; // Extract the id from the URL parameter
        // const updatedPropertyData = req.body; // Updated data for the person
        const data = req.body;
        for (const key in data) {
            if(data[key]===''){
              delete data[key];
            }
        }
        
        const response = await property.findByIdAndUpdate(propertyID, data, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })
        console.log(data)
        console.log(response)
        if (!response) {
            throw "Property data not found"
        }

        console.log('property data updated');
        req.flash('message', "Property updated successfully !!!!!!");
        res.redirect('/seller/profile')
    }catch(err){
        req.flash('message', err)
        return res.redirect('/seller/profile')
    }
})



module.exports = router;