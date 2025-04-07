import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser, deleteUser } from "../features/users/manageUserSlice.js";

const UserManager = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userId: "",
    role: "",
  });
  const { name, email, userId, role } = formData;

  const { isError, isSuccess, message } = useSelector((state) => state.users);

  const { user } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
  }, [user, isError, message, isSuccess, navigate, dispatch]);

  const userData = { name, email, role };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">
        User Manager
      </h1>
      <form className="space-y-4">
        <div>
          <input
            placeholder="UserId"
            type="text"
            name="userId"
            value={userId}
            onChange={onChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <input
            placeholder="New name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <input
            placeholder="new email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <input
            placeholder="Role"
            type="text"
            name="role"
            value={role}
            onChange={onChange}
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
            onClick={() => dispatch(updateUser(userData, userId))}
          >
            Update User
          </button>

          <button
            type="button"
            onClick={() => dispatch(deleteUser(userId))}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Delete User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserManager;
