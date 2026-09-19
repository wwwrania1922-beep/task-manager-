import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditTask({ tasks, onEdit }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === Number(id));

  const [title, setTitle] = useState(task ? task.title : '');
  const [priority, setPriority] = useState(task ? task.priority : 'medium');

  if (!task) {
    return <p>المهمة مش موجودة</p>;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === '') return;

    onEdit(task.id, title, priority);
    navigate('/');
  }

  return (
    <div className="card p-4 shadow-sm">
      <h1 className="mb-3">تعديل المهمة</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          حفظ التعديل
        </button>
      </form>
    </div>
  );
}

export default EditTask;