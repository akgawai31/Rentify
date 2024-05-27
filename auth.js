const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req, res, next) => {

    // first check request cookies has authorization or not
    const token = req.cookies.access_token;
    if (!token) {
        console.log("Token not found")
        return res.redirect('./login')
    }
    try{
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request object
        req.user = decoded
        next();
    }catch(err){
        res.redirect('/login');
    }
}



// Function to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30000});
}



module.exports = {jwtAuthMiddleware, generateToken};