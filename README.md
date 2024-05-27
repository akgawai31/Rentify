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
   ![Screenshot (14)](https://github.com/akgawai31/Rentify/assets/76953374/c114c946-53e2-4b8c-b394-3fdda425383e)

3. Buyers Login, Route -> localhost:/login
   ![Screenshot (15)](https://github.com/akgawai31/Rentify/assets/76953374/15e6ce7c-c4c4-4efe-9c61-6b3a8f342665)
   ![Screenshot (13)](https://github.com/akgawai31/Rentify/assets/76953374/d322469d-31d2-4edf-8add-6323c3d0293e)

4. Buyers Signup, Route -> localhost:/login



5. Seller Signup, Route -> localhost:/seller/singup

6. Seller Login, Route -> localhost:/seller/login
> [!NOTE]
> To access following routes user must be logged in as Seller.
6. Profile, Route -> localhost:/seller/profile
    ![Screenshot (18)](https://github.com/akgawai31/Rentify/assets/76953374/334d7bf5-78b2-4099-b404-3a09a43f5ee3)
6. Add Property, Route -> localhot:/seller/add/:propertyID
7. Delete Property, Route -> localhot:/seller/delete/:propertyID
8. Update Property, Route -> localhost:/seller/update/:propertyID
