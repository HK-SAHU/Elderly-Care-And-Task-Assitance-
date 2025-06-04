import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTasks([...tasks, response.data]);
      setNewTask({
        title: '',
        description: '',
        date: '',
        time: '',
        priority: 'medium',
        status: 'pending'
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleComplete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, 
        { status: 'completed', completedAt: new Date() },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      setTasks(tasks.map(task => 
        task._id === taskId ? response.data : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="tasks-container">
      <div className="task-form">
        <h2>Create New Task</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={handleChange}
            placeholder="Task Title"
            required
          />
          <textarea
            name="description"
            value={newTask.description}
            onChange={handleChange}
            placeholder="Task Description"
          />
          <input
            type="date"
            name="date"
            value={newTask.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={newTask.time}
            onChange={handleChange}
            required
          />
          <select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task._id} className={`task-card ${task.status}`}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-details">
              <span>Date: {new Date(task.date).toLocaleDateString()}</span>
              <span>Time: {task.time}</span>
              <span className={`priority ${task.priority}`}>
                Priority: {task.priority}
              </span>
            </div>
            <div className="task-actions">
              {task.status === 'pending' && (
                <button onClick={() => handleComplete(task._id)}>Complete</button>
              )}
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;