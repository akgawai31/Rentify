const express = require('express')
const router = express.Router();
const User = require('./../models/users')
const property = require('./../models/property')
const {jwtAuthMiddleware, getUser} = require('./../auth');

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

router.get('/seller/login', async (req, res) =>{
    return res.render("sellerView/login", {messages: req.flash('message')})
})

router.get('/seller/signup', async (req, res) =>{
    return res.render("sellerView/signup", {messages: req.flash('message')})
})

router.get('/seller/add', jwtAuthMiddleware, async (req, res) =>{
    try{
        return res.render("sellerView/add")
    }
    catch(err){
        return res.redirect('./login')
    }
})

router.get('/seller/update/:id', jwtAuthMiddleware, async (req, res) =>{
    try{
        const id = req.params.id;
        const properties = await property.findOne({_id:id});
        console.log(properties)
        return res.render("sellerView/update", {property : properties})
    }
    catch(err){
        return res.redirect('./login')
    }
})

router.get('/signup', async (req, res) =>{
    return res.render("signup", {messages: req.flash('message')})
})

router.get('/login', async (req, res) =>{
    return res.render("login", {messages: req.flash('message')})
})



//logout user
router.get("/logout", (req, res) => {
    res.clearCookie("access_token")
    return res.redirect('/')
});





module.exports = router;