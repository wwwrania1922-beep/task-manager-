import { useState } from 'react';
import { Link } from 'react-router-dom';

const priorityColors = {
  high: { bg: '#fee2e2', text: '#dc2626', label: 'عاجل' },
  medium: { bg: '#fef3c7', text: '#d97706', label: 'متوسط' },
  low: { bg: '#dcfce7', text: '#16a34a', label: 'منخفض' },
};

function TaskList({ tasks, onDelete, onToggle }) {
  const [filter, setFilter] = useState('all');

  const completedCount = tasks.filter((t) => t.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="card p-4 shadow-sm">
      <h1 className="mb-3">My Tasks</h1>
      <p className="text-muted">
        {completedCount} من {tasks.length} مهمة مكتملة
      </p>

      <div className="btn-group mb-3">
        <button
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('all')}
        >
          الكل
        </button>
        <button
          className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('active')}
        >
          غير مكتملة
        </button>
        <button
          className={`btn btn-sm ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('completed')}
        >
          مكتملة
        </button>
      </div>

      <ul className="list-group">
        {filteredTasks.map((task) => {
          const p = priorityColors[task.priority] || priorityColors.medium;
          return (
            <li
              key={task.id}
              className="list-group-item d-flex align-items-center justify-content-between"
            >
              <div className="d-flex align-items-center">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </span>
                <span
                  className="badge ms-2"
                  style={{ backgroundColor: p.bg, color: p.text }}
                >
                  {p.label}
                </span>
              </div>
              <div>
                <Link
                  to={`/edit/${task.id}`}
                  className="btn btn-outline-primary btn-sm me-2"
                >
                  تعديل
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(task.id)}
                >
                  حذف
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {filteredTasks.length === 0 && (
        <p className="text-center text-muted mt-3">مفيش مهام في القسم ده</p>
      )}
    </div>
  );
}

export default TaskList;