# Task Management Web Application

A simple **Full-Stack Task Management** web application where users can **create, view, update, and delete tasks**. The application includes authentication and status-based task filtering.

🚀 **Live Demo**

- **Frontend (React App):** https://globaltrendassignment.netlify.app
- **Backend API (Node.js/Express):** https://globaltrendassignment-backend.onrender.com

## **Features**

- User Authentication (Login & Signup)  
- Add, Update, Delete Tasks  
- Task Fields: **Title**, **Description**, **Status** (`ToDo`, `InProgress`, `Completed`)  
- Filter tasks by status  
- Responsive UI  
- Persistent data storage with MongoDB  

---

## **Tech Stack**

- **Frontend:** React, React Router DOM, Bootstrap  
- **Backend:** Node.js, Express  
- **Database:** MongoDB (Atlas or local)  
- **Authentication:** JWT  
- **Environment Variables:** `.env`  

---

## **Folder Structure**
    # React app
    ├─ src
    │ ├─ components
    │ │ ├─ Navbar.jsx
    │ │ ├─ AddTask.jsx
    │ │ └─ TaskItem.jsx
    | | |_ Home.jsx
    | | |_ Login.jsx
    | | |_ Signup.jsx
    │ ├─ context
    │ │ ├─ taskContext.jsx
    │ │ └─ TaskState.jsx
    │ └─ App.jsx
    /backend # Node.js API
    ├─ routes
    │ └─ task.js
    | |_ auth.js
    ├─ models
    │ ├─ Task.js
    │ └─ User.js
    └─ middleware
    └─ fetchuser.js

## **Setup Instructions**

### **Backend**

1. Navigate to backend folder:
   ```bash
   cd backend

2. Install dependencies:

    npm install

3. Create a .env file with:

    PORT=4000
    MONGO_URI=<your_mongo_connection_string>
    JWT_SECRET=<your_jwt_secret>

4. Start server:

    npm run dev

The backend runs at http://localhost:4000

### **Frontend**

1. Navigate to frontend folder:

    cd frontend

2. Install dependencies:

    npm install

3. Create a .env file with:

    VITE_APP_API_URL=http://localhost:4000

4. Start React app:

    npm run dev


The app runs at http://localhost:5173 (default Vite port)

## **Usage**

    Signup: Create a new account

    Login: Access your dashboard

    Add Task: Fill title, description, status, and submit

    Update Task: Click on status dropdown on a task card

    Delete Task: Click the delete button on a task card

    Filter Tasks: Use the status dropdown in the navbar

    Logout: Click logout button to return to login/signup

## **API Endpoints**

    POST /api/user/addTask → Add new task

    GET /api/user/fetchallTasks → Fetch all tasks for logged-in user

    PUT /api/user/updatetasks/:id → Update task status

    DELETE /api/user/deleteTask/:id → Delete a task

    GET /api/user/filter?status= → Filter tasks by status

## **Notes**

    Make sure to have MongoDB running locally or on Atlas

    Authentication uses JWT, so token must be sent in auth-token header for protected routes

    Frontend automatically hides/shows Login, Signup, Logout buttons based on user state