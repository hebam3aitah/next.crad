// app/page.js
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', email: '' });

  // جلب المستخدمين من API باستخدام Axios
  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // إرسال البيانات عند إضافة أو تعديل مستخدم
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? 'PUT' : 'POST';
    try {
      await axios({
        method: method,
        url: '/api/users',
        data: form,
      });
      setForm({ id: null, name: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // ملء النموذج بالبيانات عند التعديل
  const handleEdit = (user) => {
    setForm(user);
  };

  // حذف مستخدم
  const handleDelete = async (id) => {
    try {
      await axios.delete('/api/users', { data: { id } });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // جلب المستخدمين عند تحميل الصفحة
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">User Manager</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {form.id ? 'Update' : 'Add'} User
        </button>
      </form>

      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-4 flex justify-between items-center">
            <div>
              <strong>{user.name}</strong> <br />
              <span>{user.email}</span>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(user)} className="text-blue-500">
                Edit
              </button>
              <button onClick={() => handleDelete(user.id)} className="text-red-500">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
