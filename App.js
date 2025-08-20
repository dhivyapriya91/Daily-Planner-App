import React, { useState } from 'react';
import './styles.css';

function App() {
  const [taskName, setTaskName] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (!taskName || !taskDate || !taskTime) return;
    const newTask = {
      id: Date.now(),
      name: taskName,
      date: taskDate,
      time: taskTime,
      status:'Pending',
    };
    setTasks([...tasks, newTask]);
    setTaskName('');
    setTaskDate('');
    setTaskTime('');
  };

  const updateStatus = (id, status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  return (
    <div className="container">
    <div style={{ padding: '20px' }}>
      <h1>Daily Planner App</h1>
      <input
        type="text"
        placeholder="Taskname"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <br/>
      <input
        type="date"
        value={taskDate}
        onChange={(e) => setTaskDate(e.target.value)}
      />
      <input
        type="time"
        value={taskTime}
        onChange={(e) => setTaskTime(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>

      <h2>All Tasks List</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <p>Taskname: {task.name}</p>
          <p>Date: {task.date}</p>
          <p>Time: {task.time}</p>
          <button onClick={() => updateStatus(task.id, 'Pending')}>Pending</button>
          <button onClick={() => updateStatus(task.id, 'Completed')}>Completed</button>
          <button onClick={() => deleteTask(task.id,'Delete')}>Delete</button>
          <hr />
        </div>
      ))}

      <h2>Status of Task List</h2>
      <button onClick={() => setFilter('All')}>Show All Tasks</button>
      <button onClick={() => setFilter('Completed')}>Completed Tasks</button>
      <button onClick={() => setFilter('Pending')}>Pending Tasks</button>

      {filteredTasks.map((task) => (
        <div key={task.id} style={{ marginTop: '10px' }}>
          <p>Task: {task.name}</p>
          <p>Date: {task.date}</p>
          <p>Time: {task.time}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </div>
    </div>
  );
}

export default App;

