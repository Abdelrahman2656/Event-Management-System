# Event Management System API

![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)
![Express](https://img.shields.io/badge/Express-v5.1.0-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-latest-brightgreen.svg)

## Overview

A comprehensive RESTful API for managing events, users, bookings, and administrative functions. This system allows for event creation, user registration, booking management, and administrative controls with proper authentication and authorization.

## Features

- **User Management**
  - User registration and authentication
  - JWT-based authentication system
  - Role-based access control (Admin/User)

- **Event Management**
  - Create, update, and delete events (Admin only)
  - View available events (Users and Admins)
  - Image upload for events using Cloudinary

- **Booking System**
  - Book events
  - Manage bookings
  - View booking history

- **Admin Dashboard**
  - Manage users
  - Manage events
  - Handle bookings

- **Security Features**
  - Rate limiting to prevent abuse
  - Password hashing using bcrypt
  - JWT token authentication
  - Role-based authorization

## Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **File Upload**: Multer with Cloudinary
- **Internationalization**: i18n
- **Logging**: Morgan
- **API Security**: 
  - CORS
  - Rate Limiting
  - Environment Variable Protection

## API Endpoints

### User Routes
- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - User login

### Event Routes
- `POST /api/v1/create-event` - Create a new event (Admin)
- `PUT /api/v1/update-event/:eventId` - Update an event (Admin)
- `DELETE /api/v1/delete-event/:eventId` - Delete an event (Admin)
- `GET /api/v1/all-events` - Get all events
- `GET /api/v1/event-by-id/:eventId` - Get event by ID

### Booking Routes
- `POST /api/v1/book-event` - Book an event
- `GET /api/v1/bookings` - Get user's bookings

### Admin Routes
- Various administrative endpoints for user and system management

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Abdelrahman2656/Task-Areeb.git
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=3001
   NODE_ENV=development
   DB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the server:
   ```
   npm start
   ```

## Deployment

This project is configured for deployment on Vercel:

```
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}
```

## Project Structure

```
├── Database
│   └── dbconnection.js
├── Src
│   ├── app.controller.js
│   ├── Middleware
│   │   ├── asyncHandler.js
│   │   ├── authentication.js
│   │   ├── authorization.js
│   │   └── validation.js
│   ├── Modules
│   │   ├── Admin
│   │   ├── Booking
│   │   ├── Event
│   │   ├── User
│   │   └── index.js
│   └── Utils
│       ├── Cloudinary
│       ├── I18n
│       ├── Rate-Limiter
│       └── constant
├── index.js
├── package.json
└── vercel.json
```

## License

ISC

## Author

Abdelrahman 