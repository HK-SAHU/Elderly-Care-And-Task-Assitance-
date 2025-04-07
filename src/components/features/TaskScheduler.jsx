import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './TaskScheduler.css';

const TaskScheduler = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    time: '',
    type: 'medicine'
  });
  const [selectedDateTasks, setSelectedDateTasks] = useState([]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Update localStorage when tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks for selected date
  useEffect(() => {
    const filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
    setSelectedDateTasks(filteredTasks);
  }, [date, tasks]);

  const handleInputChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    
    if (!newTask.title || !newTask.time) {
      alert('Please fill in all required fields');
      return;
    }
    
    const taskToAdd = {
      id: Date.now(),
      ...newTask,
      date: date.toISOString(),
      completed: false
    };
    
    setTasks([...tasks, taskToAdd]);
    
    // Reset form
    setNewTask({
      title: '',
      description: '',
      time: '',
      type: 'medicine'
    });
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  // Function to get task type icon/emoji
  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'medicine':
        return '💊';
      case 'appointment':
        return '🩺';
      case 'grocery':
        return '🛒';
      case 'activity':
        return '🏃‍♂️';
      default:
        return '📝';
    }
  };

  return (
    <div className="task-scheduler">
      <h2 className="feature-title">Task Scheduler</h2>
      <p className="feature-description">
        Schedule and manage daily tasks for your loved ones
      </p>
      
      <div className="task-scheduler-container">
        <div className="calendar-section">
          <Calendar 
            onChange={setDate} 
            value={date}
            className="task-calendar"
            tileClassName={({ date }) => {
              // Check if there are tasks for this date
              const hasTask = tasks.some(task => {
                const taskDate = new Date(task.date);
                return (
                  taskDate.getDate() === date.getDate() &&
                  taskDate.getMonth() === date.getMonth() &&
                  taskDate.getFullYear() === date.getFullYear()
                );
              });
              
              return hasTask ? 'has-tasks' : null;
            }}
          />
          
          <div className="selected-date">
            <h3>
              {date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
          </div>
        </div>
        <div className="tasks-section">
          <div className="add-task-form">
            <h3>Add New Task</h3>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label htmlFor="title">Task Title*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter task title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter task description"
                  rows="3"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="time">Time*</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newTask.time}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="type">Task Type</label>
                  <select
                    id="type"
                    name="type"
                    value={newTask.type}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="medicine">Medicine</option>
                    <option value="appointment">Appointment</option>
                    <option value="grocery">Grocery</option>
                    <option value="activity">Activity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" className="btn-primary add-task-btn">
                Add Task
              </button>
            </form>
          </div>
          
          <div className="tasks-list">
            <h3>Tasks for {date.toLocaleDateString()}</h3>
            
            {selectedDateTasks.length === 0 ? (
              <div className="no-tasks">
                <p>No tasks scheduled for this day</p>
              </div>
            ) : (
              <ul className="tasks">
                {selectedDateTasks.map(task => (
                  <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                    <div className="task-header">
                      <span className="task-type-icon">{getTaskTypeIcon(task.type)}</span>
                      <span className="task-time">{task.time}</span>
                      <span className="task-title">{task.title}</span>
                    </div>
                    
                    {task.description && (
                      <div className="task-description">{task.description}</div>
                    )}
                    
                    <div className="task-actions">
                      <button 
                        className={`btn-toggle ${task.completed ? 'completed' : ''}`}
                        onClick={() => handleToggleComplete(task.id)}
                      >
                        {task.completed ? 'Completed' : 'Mark Complete'}
                      </button>
                      <button 
                        className="btn-delete"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskScheduler;