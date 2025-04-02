import React, { useEffect, useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", role: "", email: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:5000/users");
    const data = await response.json();
    setUsers(data);
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ name: user.name, role: user.role, email: user.email });
  };

  const handleSave = async (id) => {
    await fetch(`http://localhost:5000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">User Management</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border border-gray-300 text-center">
              <td className="border border-gray-300 p-2">
                {editingUser === user._id ? (
                  <input
                    className="border p-1 rounded"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingUser === user._id ? (
                  <input
                    className="border p-1 rounded"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingUser === user._id ? (
                  <input
                    className="border p-1 rounded"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-300 p-2">
                {editingUser === user._id ? (
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                    onClick={() => handleSave(user._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                )}
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
