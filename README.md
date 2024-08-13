# 🌞 Power Canada - Solar Energy Management System

## Overview

**Power Canada** is a Solar Energy Management System that empowers users to monitor their energy generation, manage their accounts, and compare energy statistics. The application is designed with both admin and regular user roles in mind, providing different functionalities based on the role.

- **Admin Panel:** Admin users can view and manage all users, compare energy statistics across different users, and have full access to the dashboard.
- **User Dashboard:** Regular users can log in to view their own energy statistics in an interactive chart.

## Features

### 🎨 **User Authentication**
- **Login/Signup:** Users can create an account or log in using their credentials. The system supports role-based access (admin vs. regular users).
- **Role-Based Access Control:** Admin users have access to advanced features like user management and energy comparisons.

### 📊 **Dashboard**
- **User-Specific Dashboard:** Upon logging in, users can view their own solar energy generation data visualized in an interactive chart.
- **Admin Dashboard:** Admin users can view and compare energy data for multiple users, as well as manage user accounts.

### 👥 **User Management (Admin Only)**
- **User Listing:** Admins can view a list of all registered users.
- **Edit & Delete Users:** Admins can edit user details or delete user accounts.

### 💻 **Technology Stack**
- **Frontend:** React.js with custom CSS for styling and Chart.js for interactive data visualization.
- **Backend:** Node.js with Express.js for handling API requests.
- **Database:** MongoDB Atlas for managing user data and energy statistics.
- **Authentication:** Currently managed with custom login logic; can be enhanced using Firebase Authentication or JWT for better security and scalability.

## 🚀 Getting Started

### Prerequisites
- **Node.js:** Ensure you have Node.js installed on your machine.
- **MongoDB Atlas:** Set up a MongoDB Atlas account and configure your database.



## Project Overview
Power Canada is a web application designed to manage and track various user-related data efficiently. This application is developed using Node.js, Express, and MongoDB, following the MVC architecture. It includes CRUD operations for managing user data and implements authentication and authorization features.

## Features
- User authentication and authorization
- CRUD operations for user data
- MongoDB database integration
- RESTful API for user management
- MVC architecture

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens) for authentication
- Postman for API testing

## Installation

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account or local MongoDB instance
