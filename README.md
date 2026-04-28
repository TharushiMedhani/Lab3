# Final MERN Lab Test Practice - Task Manager

## Question

Build a Task Manager System using MERN stack.

### Backend Requirements
Create Task model with:
- title: String, required
- description: String
- status: String, default "Pending"
- priority: String: Low / Medium / High
- createdAt: automatic timestamp

### API Endpoints
- GET /api/tasks - get all tasks
- POST /api/tasks - add task
- PUT /api/tasks/:id - mark task as Completed
- DELETE /api/tasks/:id - delete task

### Frontend Requirements
- Form: title, description, priority
- Display all tasks
- Buttons: Mark as Completed, Delete

## How to Run

### Backend
cd backend
npm install
copy .env.example to .env
add your MongoDB Atlas connection string
npm run dev

### Frontend
cd frontend
npm install
npm run dev

## Important Exam Note
When deploying, change API_URL in frontend/src/App.jsx from localhost to your deployed backend URL.
