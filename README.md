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