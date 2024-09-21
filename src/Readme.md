

# **Expense-Backend**

This is the backend service for managing expenses in a financial tracking application. It is built using Node.js, Express, and MongoDB. This backend handles user authentication, expense management, and reporting features.

## **Table of Contents**

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [License](#license)

## **Features**

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **Protected Routes**: Routes that require authentication for sensitive actions.
- **Expense Tracking**: Add, edit, delete, and view expenses for authenticated users.
- **Category Management**: Manage categories for expense classification.
- **Expense Reports**: Generate detailed reports based on user expenses.

## **Tech Stack**

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose for schema)
- **JWT** for authentication
- **bcrypt** for password hashing

## **Installation**

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Rudra-1103/Expense-backend.git
   ```

2. Install the dependencies:

   ```bash
   cd Expense-backend
   npm install
   ```

3. Create a `.env` file in the root directory and configure the environment variables (see [Environment Variables](#environment-variables)).

4. Start the development server:

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000` (or the port specified in your `.env` file).

## **Environment Variables**

Create a `.env` file in the root of your project and add the following variables:

```plaintext
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```

- **PORT**: The port on which the server will run.
- **MONGO_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret key for JWT authentication.

## **API Endpoints**

### **Base Routes**

- **User Routes**: `/api/v1/users`
- **Category Routes**: `/api/v1/categories`
- **Expense Routes**: `/api/v1/expenses`

### **User Authentication**

- `POST /api/v1/users/register` - Register a new user.
- `POST /api/v1/users/login` - Log in and get a JWT.

### **Protected Routes** (Requires Authentication)

- `POST /api/v1/users/logout` - Log out the current user.
- `PATCH /api/v1/users/update-account` - Update user account information.
- `POST /api/v1/users/refresh-token` - Refresh the access token.
- `GET /api/v1/users/me` - Get the current user details.
- `PATCH /api/v1/users/change-password` - Change the user's password.

### **Categories**

- `POST /api/v1/categories/create` - Create a new category.
- `GET /api/v1/categories/get` - Get all categories.
- `GET /api/v1/categories/get/:categoryId` - Get a category by ID.
- `PATCH /api/v1/categories/update/:categoryId` - Update a category by ID.
- `DELETE /api/v1/categories/delete/:categoryId` - Delete a category by ID.

### **Expenses**

- `POST /api/v1/expenses/create` - Create a new expense.
- `GET /api/v1/expenses/get` - Get all expenses.
- `GET /api/v1/expenses/get/:expenseId` - Get an expense by ID.
- `POST /api/v1/expenses/get/:expenseId` - Update an expense by ID.
- `DELETE /api/v1/expenses/get/:expenseId` - Delete an expense by ID.

## **Contributing**

Contributions are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Open a pull request.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
