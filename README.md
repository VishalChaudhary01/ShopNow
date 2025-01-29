# ShopNow - Full-Stack E-Commerce Platform

## Overview

**ShopNow** is a fully functional e-commerce platform designed to provide a seamless shopping experience for users and an efficient product management system for admins. The platform allows users to browse products, apply filters, add items to their cart, and complete purchases. Admins can manage products, track inventory, and handle media uploads.

## User Features

- **Product Browsing:** Users can browse products with pagination and filtering options (e.g., by category, price range, brand).
- **Shopping Cart:** Users can add/remove products, update quantities, and view the total cost.
- **Checkout:** Secure and intuitive checkout process.
- **Responsive Design:** Optimized for both desktop and mobile devices.

## Admin Features

- **Product Management:** Admins can add, update, and delete products.
- **Media Upload:** Admins can upload product images using Cloudinary for efficient media storage and delivery.
- **Inventory Tracking:** Admins can monitor product stock levels.

## Technical Features

- **Authentication & Authorization:** Secure user authentication and role-based access control.
- **Validation:** Robust input validation using Zod for both frontend and backend.
- **File Uploads:** Efficient handling of file uploads using Multer and Cloudinary.
- **State Management:** Centralized state management using Redux Toolkit for a smooth user experience.
- **API Integration:** Seamless communication between frontend and backend using Axios.

## Technologies and Frameworks

### Backend

- **Express.js:** A minimal and flexible Node.js web application framework.
- **MongoDB:** A NoSQL database for storing product, user, and order data.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB, used for schema validation and query building.
- **TypeScript:** A statically typed superset of JavaScript for improved code quality and maintainability.
- **Zod:** A TypeScript-first schema validation library for ensuring data integrity.
- **Multer:** Middleware for handling file uploads.
- **Cloudinary:** A cloud-based media storage and delivery service.

### Frontend

- **React:** A JavaScript library for building dynamic and responsive user interfaces.
- **React Router DOM:** For client-side routing and navigation.
- **Redux Toolkit:** For efficient state management across the application.
- **Axios:** For making HTTP requests to the backend API.

## How to Run the Project Locally

### Steps

1. Clone the Repository:
   ```bash
     git clone https://github.com/VishalChaudhary01/ShopNow.git
     cd ShopNow
   ```

2. Install Dependencies:
   ```bash
     cd backend
     npm install
     cd ../frontend
     npm install
   ```

3. Set Up Environment Variables:

   - Copy .env.example to .env:
     ```bash
       cd backend
       cp .env.example .env
       cd ../frontend
       cp .env.example .env
     ```

   - Update .env file in backend:
     ```bash
       DB_URL=your_mongodb_connection_string
       JWT_SECRET=your_jwt_secret
       COOKIE_NAME=your_cookie_name
       COOKIE_SECRET=your_cookie_secret
       CLOUD_NAME=your_cloudinary_cloud_name
       API_KEY=your_cloudinary_api_key
       API_SECRET=your_cloudinary_api_secret
       JWT_SECRET=your_jwt_secret_key
       STRIPE_SECRET=your_stripe_secret
       STRIPE_KEY=your_stripe_key
     ```

   - Update .env file in frontend:
     ```bash
       VITE_BACKEND_URL=your_backend_url
       VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
     ```

4. Run the Backend:
   ```bash
     cd backend
     npm run dev
   ```

5. Run the frontend:
   ```bash
     cd frontend
     npm run dev
   ```

6. Access the Application:
   Open your browser and navigate to http://localhost:5173.

## Contributions Welcome

If you'd like to contribute to this project, feel free to open an issue or submit a pull request. Your feedback and suggestions are highly appreciated!

## Screenshots

![2](https://github.com/user-attachments/assets/a8bfbd28-a9cf-4add-aa96-55b6eccae489)

![1](https://github.com/user-attachments/assets/5e3bc452-cd8f-40aa-8a8b-bd3c28a4bceb)
