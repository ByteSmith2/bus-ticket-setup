// src/pages/admin/EmployeeManagement.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    role: "Employee",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/Employee");
        setEmployees(response.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Auth/register", employeeData); // Sử dụng endpoint register
      setEmployees([...employees, response.data]);
      setEmployeeData({
        username: "",
        password: "",
        name: "",
        email: "",
        phoneNumber: "",
        role: "Employee",
      });
    } catch (error) {
      console.error("Failed to add employee:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4"
    >
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Employee Management
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6">
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={employeeData.username}
              onChange={(e) => setEmployeeData({ ...employeeData, username: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={employeeData.password}
              onChange={(e) => setEmployeeData({ ...employeeData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              required
            />
            <input
              type="text"
              placeholder="Full Name"
              value={employeeData.name}
              onChange={(e) => setEmployeeData({ ...employeeData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={employeeData.email}
              onChange={(e) => setEmployeeData({ ...employeeData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={employeeData.phoneNumber}
              onChange={(e) => setEmployeeData({ ...employeeData, phoneNumber: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 font-semibold"
            >
              Add Employee
            </button>
          </form>
          <ul className="space-y-2">
            {employees.map((employee) => (
              <li
                key={employee.id}
                className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
              >
                {employee.name} ({employee.username}) - {employee.role}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all duration-200"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default EmployeeManagement;