import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask({ onAdd }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === '') return;

    onAdd(title, priority);
    navigate('/');
  }

  return (
    <div className="card p-4 shadow-sm">
      <h1 className="mb-3">Add New Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="اكتبي اسم المهمة"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">الأولوية</label>
          <select
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">عاجل</option>
            <option value="medium">متوسط</option>
            <option value="low">منخفض</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddTask;