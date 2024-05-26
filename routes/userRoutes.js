const express = require('express');
const router = express.Router();
const User = require('./../models/users')
const {jwtAuthMiddleware, generateToken} = require('./../auth');
const property = require('./../models/property')
const querystring = require('querystring'); 
const ejs = require('ejs')
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { error } = require('jquery');
const OAuth2 = google.auth.OAuth2;


//main page route
router.get('/', async (req, res) =>{
    try{
        const properties = await property.find();
        console.log(req.query.id)
        console.log(req.query.name)
        for(let key in properties){
            likeby = properties[key].like_by;
            properties[key]['like'] = likeby.includes(req.query.id)
            properties[key]['like_counts'] = likeby.length
        }
        
        context = {properties};
        const token = req.cookies.access_token;
        context['token'] = token;
        context['user_name'] = req.query.name
        // context['user_id'] = req.query.id
        return res.render('index', context)
    }
    catch(err){
        console.log("data not found")
        return res.status(400).json({error : "Internal server error"})
    }   
})



//login route
router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email})
        if( !user || !(await user.comparePassword(password))){
            req.flash('message', "Invalid Email or Password");
            return res.redirect('/login');
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
        res.redirect('/')
     }
     catch(err){
        console.log(err);
        req.flash('error', err);
        res.redirect('./')
     } 
 })

 // registartion route
 router.post('/signup', async (req, res) => {
    try{
       const data = req.body;
       const newPerson = new User(data);
       const savedPerson = await newPerson.save();
       console.log("data saved");
       req.flash('message', "Registered Successfully !!!")
       return res.redirect('/signup')
    }
    catch(err){
       console.log("error", err)
       req.flash('message', "User not Registered !!!")
       return res.redirect('/signup');
    } 
 })


 //like property
 router.get('/addlike/:id', jwtAuthMiddleware,async (req, res)=>{
    try{   
        const propertyID = req.params.id; 
        data = { 
            $addToSet : { like_by : req.user.id },
        }

        const response = await property.findByIdAndUpdate(propertyID, data, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            throw "Property not found"
        }
        const query = querystring.stringify({
            "name":req.user.name,
            "id":req.user.id
        });
        console.log('like added');
        return res.redirect('/?' + query)
    }catch(err){
        console.log("error", err)
        req.flash('message', err)
        return res.redirect('/');
    }
})


//dislike property
router.get('/dislike/:id', jwtAuthMiddleware,async (req, res)=>{
    try{   
        const propertyID = req.params.id; 
        data = { 
            $pull : { like_by : req.user.id },
        }

        const response = await property.findByIdAndUpdate(propertyID, data, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Property not found' });
        }
        const query = querystring.stringify({
            "name":req.user.name,
            "id":req.user.id
        });
        console.log('dislike to property');
        return res.redirect('/?' + query)
    }catch(err){
        console.log("error", err)
        req.flash('message', err)
        return res.redirect('/');
    }
})
 


//mail transporter
const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });
  
    return transporter;
  };
  
  
  
  //send mail 
  const sendEmail = async (emailTransporter, to, subject, template, data) => {
    const html = await ejs.renderFile('views/'+ template, data,{ async:true})
      const mailOptions = {
              from: process.env.EMAIL,
              to,
              subject,
              html
          }
  
    await emailTransporter.sendMail(mailOptions);
  };
  


//see the details of the Seller and mail them
router.get('/:id', jwtAuthMiddleware, async (req, res) => {
    try{
        const id = req.params.id;
        const seller = await User.findOne({_id:id})
        const curr_user = await User.findOne({_id:req.user.id})
        let emailTransporter = await createTransporter();
        const seller_name = seller.first_name + " " + seller.last_name;
        const buyer_name = curr_user.first_name+ " "+ curr_user.last_name;
        context = {
            "user_name": buyer_name,
            "name" : seller_name,
            "email" : seller.email,
            "mobile": seller.mobile
        }
        sendEmail(emailTransporter, curr_user.email, "Sellers Details", 'sendMailToBuyer.ejs', context);
        context["user_name"] = seller_name,
        context["name"] = buyer_name,
        context["email"] = curr_user.email
        context["mobile"] = curr_user.mobile
        sendEmail(emailTransporter, seller.email, "Buyers Details", 'sendMailToSeller.ejs', context);
        emailTransporter.close();
        return res.render('details', {person : seller})
    }
    catch(err){
        console.log("error", err)
        req.flash('message', err)
        return res.redirect('/');
    }
})




module.exports = router;