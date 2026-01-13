# Student Task Manager

A full-stack web application for managing student tasks with user authentication, CRUD operations, filtering, sorting, and search functionality.

## 🚀 Features

### Core Features

- ✅ User Registration and Login (JWT Authentication)
- ✅ Create, Read, Update, Delete Tasks
- ✅ Task Completion Toggle
- ✅ Task Filtering (All, Pending, Completed)
- ✅ Task Sorting (By Priority, By Due Date)
- ✅ Client-side Search by Task Title
- ✅ Responsive Design (Mobile & Desktop)
- ✅ Real-time Data Persistence with MongoDB

### Technical Features

- ✅ RESTful API Design
- ✅ JWT-based Authentication
- ✅ Password Hashing with bcrypt
- ✅ Input Validation and Error Handling
- ✅ CORS Support
- ✅ Environment-based Configuration

## 🛠 Tech Stack

### Frontend

- **React 18** with Vite
- **Plain CSS** (No UI Libraries)
- **Axios** for HTTP requests
- **React Router** for navigation

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Development Tools

- **Nodemon** for backend development
- **Vite** for frontend development
- **Git** for version control

## 📁 Project Structure

```
student-task-manager/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── auth.js
│   ├── config/
│   │   └── db.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── AddTaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── LoginForm.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🗄 Database Models

### User Model

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  passwordHash: String,
  createdAt: Date
}
```

### Task Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,
  priority: 'low' | 'medium' | 'high',
  dueDate: Date,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication Endpoints

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Task Endpoints (Protected)

- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or cloud service)
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Abeer-Sharif/Student-Task-Manager.git
   cd student-task-manager
   ```

2. **Set up Backend**

   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm start
   ```

3. **Set up Frontend** (in a new terminal)

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## ⚙️ Environment Configuration

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-task-manager
JWT_SECRET=your-super-secret-jwt-key-here
```

## 📱 Usage

### User Registration

1. Visit the application
2. Click "Need an account? Signup"
3. Fill in name, email, and password
4. Click "Signup"

### Managing Tasks

1. **Add Task**: Use the form at the top with title, description, priority, and due date
2. **Edit Task**: Click the edit icon on any task card
3. **Complete Task**: Click the checkbox to toggle completion
4. **Delete Task**: Click the delete icon on any task card
5. **Filter Tasks**: Use the filter buttons (All, Pending, Completed)
6. **Sort Tasks**: Use the sort dropdown (Priority, Due Date)
7. **Search Tasks**: Use the search bar to find tasks by title

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- Tokens are stored in localStorage
- Protected routes require valid JWT tokens
- Tokens expire after 24 hours

## 🎨 UI Components

### Main Components

- **Header**: App title and logout button
- **AddTaskForm**: Form for creating new tasks
- **TaskList**: Container for task cards
- **TaskCard**: Individual task display with actions
- **FilterBar**: Filter and sort controls
- **SearchBar**: Search functionality
- **Modal**: Edit task modal
- **LoginForm**: Authentication form

### Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Touch-friendly buttons
- Optimized for screens 320px and up

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy

### Backend (Render/Heroku)

1. Create a new web service
2. Connect your GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm start`
5. Add environment variables
6. Deploy

### Environment Variables for Production

```env
PORT=10000
MONGO_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Task CRUD operations
- [ ] Task filtering and sorting
- [ ] Search functionality
- [ ] Responsive design on mobile/desktop
- [ ] Error handling and validation
- [ ] JWT token expiration

### API Testing with cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get tasks (replace TOKEN with actual JWT)
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer TOKEN"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React, Node.js, and MongoDB
- Inspired by modern task management applications
- Designed for educational purposes

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.

---

**Happy Task Managing! 🎯**
