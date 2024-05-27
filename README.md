# Presidio Hiring Challenge

### Task

Challenge Overview:
- Part I – Basic Application (Mandatory):
Objective: Construct the core backend and frontend components of a basic application.
Expectation: Demonstrate proficiency in integrating both client-side and server-side elements.
- Part II – Add-On Features (Advanced):
Objective: Enhance the basic application with complex and innovative features.
Expectation: Showcase advanced development capabilities and creative problem-solving.
- Part III – Bonus Section (Optional):
Objective: Go above and beyond by tackling additional challenges.
Expectations: Demonstrate exceptional skill and ambition by implementing bonus functionalities.
## Functionalities

- **Authentication:** Secure user authentication using jwt.
- **like/dislike:** user can like property on clicking heart button, once user click on like button it's color change to red and
    if user again click the button it will remove the like from property
- **Delete Property:** Remove unwanted property with a simple delete option.
- **Update Property:** Edit and update property as your content evolves.
- **View Properties:** Explore and see the properties published by sellers.
- **Sending email to both seller and buyer:** Once user click on Interested button mail will be sent to both seller and buyer
  
## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine:

2. To install dependencies for both the backend and frontend:
    
    ```bash
    npm install || npm i
    ```
3. Create .env file and store following credentials
    ```bash
        DB_URL = your mongodb sever url
        PORT = port number
        JWT_SECRET = jwt secret key for authentication
        EMAIL = email to send mails for nodemailer
        CLIENT_ID = auth2 client id
        CLIENT_SECRET = auth2 client secret
        REFRESH_TOKEN = auth2 client refresh token
        ACCESS_TOKEN =  auth2 client aceess token
    ```
4. Start the node.js server:
    
    ```bash
    nodemon server.js
    ```
5. Access the application in your web browser at [http://localhost:3000](http://localhost:8000).

## Routes and Screenshots
1. main page,  Route -> localhost:/
   ![Screenshot (14)](https://github.com/akgawai31/Rentify/assets/76953374/b60ade7d-3c74-417a-b007-504671381316)

2. Buyers Login, Route -> localhost:/login
   ![Screenshot (15)](https://github.com/akgawai31/Rentify/assets/76953374/15e6ce7c-c4c4-4efe-9c61-6b3a8f342665)

3. Buyers Signup, Route -> localhost:/signup
   ![Screenshot (20)](https://github.com/akgawai31/Rentify/assets/76953374/bc4b4799-20a1-47e2-89cd-f91bc86268ed)

4. Seller Signup, Route -> localhost:/seller/singup
    ![Screenshot (21)](https://github.com/akgawai31/Rentify/assets/76953374/c4186a56-8b59-4439-8c5c-61d3051bf627)

5. Seller Login, Route -> localhost:/seller/login
   ![Screenshot (22)](https://github.com/akgawai31/Rentify/assets/76953374/0ee33a43-89eb-47cf-ad49-bee323dd549f)
   
> [!NOTE]
> To access following routes user must be logged in as Seller.
6. Profile, Route -> localhost:/seller/profile
7. Add Property, Route -> localhot:/seller/add/:propertyID
8. Delete Property, Route -> localhot:/seller/delete/:propertyID
9. Update Property, Route -> localhost:/seller/update/:propertyID
  ![Screenshot (18)](https://github.com/akgawai31/Rentify/assets/76953374/334d7bf5-78b2-4099-b404-3a09a43f5ee3)

10. Sending mail to buyer and seller
    ![Screenshot (23)](https://github.com/akgawai31/Rentify/assets/76953374/dffe7efe-b5e6-4668-bf97-0c52cd65e72c)
    ![Screenshot (24)](https://github.com/akgawai31/Rentify/assets/76953374/6f94539b-0b5c-40a8-8683-32ea857293d0)

