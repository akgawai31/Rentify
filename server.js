const express = require('express')
const path = require('path')
const app = express()
const db = require('./db')
const flash = require('connect-flash')
const session = require('express-session');
const staticRoutes = require('./routes/staticRoutes')
const sellerRoutes = require('./routes/propertyRoutes')
const userRoutes = require('./routes/userRoutes')
const bodyParser = require('body-parser');
const cookieParser  = require("cookie-parser");

// Configure session and flash middleware
app.use(session({
    secret: '124563',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use(cookieParser());
app.set('view engine', "ejs");
app.set('views', path.resolve('./views'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false}));
app.use('/', staticRoutes)
app.use('/', userRoutes)
app.use('/seller', sellerRoutes);




app.listen(process.env.PORT || 8000, () =>{
    console.log("Listening...")
})