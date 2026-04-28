import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium"
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      await axios.post(API_URL, formData);
      fetchTasks();

      setFormData({
        title: "",
        description: "",
        priority: "Medium"
      });
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager System</h1>

      <form onSubmit={handleSubmit} className="form-card">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p><b>Priority:</b> {task.priority}</p>
              <p><b>Status:</b> {task.status}</p>

              <button onClick={() => handleComplete(task._id)}>
                Mark as Completed
              </button>

              <button className="delete-btn" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
