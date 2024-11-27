# Habit Tracker App

The Habit Tracker App is a MERN (MongoDB, Express.js, React.js, Node.js) stack application that helps users build, track, and manage their daily habits effectively.

---

## Features

- **User Authentication**: Secure login using JSON Web Tokens (JWT).
- **Create Habits**: Add new habits with details such as name, description, frequency, start date, and goals.
- **Update Habits**: Edit habit details to reflect your changing goals.
- **Track Progress**: See your habit progress dynamically as you complete goals.
- **Mark Habits Complete**: Increment your progress by marking tasks complete.
- **Delete Habits**: Remove habits that are no longer needed.
- **Responsive Design**: Built with Tailwind CSS for a clean and responsive user interface.

---

## Tech Stack

### Frontend
- **React.js**: For building a dynamic and interactive UI.
- **Axios**: For making HTTP requests to the backend.
- **Tailwind CSS**: For modern, responsive UI styling.

### Backend
- **Node.js**: For the server-side logic.
- **Express.js**: For creating RESTful API endpoints.
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.

### Database
- **MongoDB**: For storing user and habit data.

---

## Installation and Setup

Follow the steps below to run the application on your local machine:

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) running locally or use a MongoDB cloud instance.

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
  ```
2. Install Dependencies:
  ```bash
    npm install
  ```
3. Create .env file in the backend directory with following keys:
  ```bash
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  ```
4. Start the backend Server:
   ```bash
     npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
     cd frontend
   ```
2. Install Dependencies:
   ```bash
     npm install
   ```
3. Start the frontend :
   ```bash
     npm run dev
   ```
