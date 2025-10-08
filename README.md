# Simple Shopping Cart Project – VertoFX 

## Project Overview - (Full Stack)
This is a **full-stack web application** simulating a **service subscription shopping cart** for VertoFX, a financial services platform.  
Users can browse services, add them to a cart, checkout, and track subscriptions. Admins can manage services and view all orders.

---

## Table of Contents
1. [Project Type](#project-type)
2. [User Credentials](#default-credentials)
3. [Features](#features)  
4. [Technologies Used](#technologies-used)  
5. [Project Structure](#project-structure)  
6. [Setup Instructions](#setup-instructions)  
7. [Usage](#usage)  
8. [Key Skills Demonstrated](#key-skills-demonstrated)  
9. [Future Enhancements](#future-enhancements)  
10. [License](#license)  

---

## Project Type
- **Full-Stack Web Application** (Frontend + Backend + Database)  

---

## User Credentials

**1. Admin :-**

   Email : aruvi@gmail.com / 
   Password : aruvi@123
----
**2. User :-**

   Email : bharath@gmail.com /
   Password : bharath@123
---
Use these credentials for testing the application quickly or You Can Sign Up

## Features

### User-Facing
- Browse financial services (Verto Accounts, Verto FX, Treasury Management, etc.)  
- Add services to cart and view total fees  
- Checkout to confirm subscriptions  
- View past orders and subscription status  
- Signup/Login with JWT authentication and role-based access  

### Admin Panel (Optional)
- Add/Edit/Delete services  
- View all user orders  
- Search and filter users or services  

---

## Technologies Used

| Layer         | Technology                      |
| ------------- | ------------------------------- |
| Frontend      | React, Tailwind CSS             |
| Backend       | Node.js, Express                |
| Database      | MongoDB (or JSON for simplicity)|
| Authentication| JWT, Password Hashing           |
| Version Control| Git / GitHub                    |

---

## Project Structure

VertoFX-Cart/
├── backend/
│ ├── models/ # User, Service, Order models
│ ├── routes/ # API routes (services, cart, checkout, orders, auth)
│ └── server.js # Express server setup
├── frontend/
│ ├── src/
│ │ ├── components/ # Navbar, ServiceCard, CartTable
│ │ ├── pages/ # Homepage, Services, Cart, Checkout, Orders, Login, Admin
│ │ └── App.jsx # Main React app with routing
│ └── package.json
└── README.md


---

## Setup Instructions

### Backend
1. Navigate to `backend/`  
2. Install dependencies:  
   ```bash
   npm install

3. Start server:
   ```bash
   npm run dev

Open in browser at http://localhost:5173 (Vite default)

Usage

Signup or Login as User or Admin

Browse available services

Add desired services to cart

Checkout to confirm subscriptions

View order history (Users) or manage services/orders (Admins)

Key Skills Demonstrated

Full-Stack Development: Frontend + Backend + Database integration

Authentication & Role-Based Access: JWT implementation

CRUD Operations: Create, Read, Update, Delete services & orders

Cart Logic & Checkout Flow: State management, total calculation

Responsive UI/UX: Tailwind CSS, clean design

API Integration: Frontend-backend communication

Future Enhancements

Implement real payment gateway integration

Add service filtering by category or price

Add analytics dashboard for Admins

Optimize performance and security

License

This project is for educational and professional portfolio purposes.


```bash

Bharath, if you want, I can also make a **short “Portfolio Version” README** that is **super concise, 1-page, visually appealing, and perfect for GitHub presentation**.  

Do you want me to make that version too?
