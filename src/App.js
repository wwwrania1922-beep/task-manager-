import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask.js';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: 'اتعلم React Router', completed: false, priority: 'medium' },
          { id: 2, title: 'ابني Task Manager', completed: false, priority: 'high' },
        ];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  function addTask(title, priority) {
    const newTask = {
      id: Date.now(),
      title: title,
      completed: false,
      priority: priority,
    };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function editTask(id, newTitle, newPriority) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, priority: newPriority }
          : task
      )
    );
  }

  return (
    <div className="container mt-5">
      <nav className="navbar navbar-light bg-light mb-4 rounded px-3 shadow-sm">
        <Link className="btn btn-outline-primary me-2" to="/">
          My Tasks
        </Link>
        <Link className="btn btn-outline-success" to="/add">
          Add Task
        </Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <TaskList tasks={tasks} onDelete={deleteTask} onToggle={toggleTask} />
          }
        />
        <Route path="/add" element={<AddTask onAdd={addTask} />} />
        <Route
          path="/edit/:id"
          element={<EditTask tasks={tasks} onEdit={editTask} />}
        />
      </Routes>
    </div>
  );
}

export default App;