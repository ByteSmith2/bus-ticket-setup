// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("routes"); // Tab mặc định là "routes"
  const [routes, setRoutes] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routeData, setRouteData] = useState({ startLocation: "", endLocation: "", distance: "" });
  const [employeeData, setEmployeeData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    role: "Employee",
  });
  const [busData, setBusData] = useState({ busNumber: "", typeName: "", totalSeats: "" });

  // Fetch dữ liệu khi component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routeResponse, employeeResponse, busResponse] = await Promise.all([
          api.get("/Route"),
          api.get("/Employee"),
          api.get("/Bus"),
        ]);
        setRoutes(routeResponse.data);
        setEmployees(employeeResponse.data);
        setBuses(busResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  // Thêm tuyến đường
  const handleAddRoute = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Route", routeData);
      setRoutes([...routes, response.data]);
      setRouteData({ startLocation: "", endLocation: "", distance: "" });
    } catch (error) {
      console.error("Failed to add route:", error);
    }
  };

  // Thêm nhân viên
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Auth/register", employeeData);
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

  // Thêm xe buýt
  const handleAddBus = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Bus", busData);
      setBuses([...buses, response.data]);
      setBusData({ busNumber: "", typeName: "", totalSeats: "" });
    } catch (error) {
      console.error("Failed to add bus:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Admin Dashboard
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6">
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-300 dark:border-gray-600">
            <button
              className={`flex-1 py-2 text-center font-semibold ${
                activeTab === "routes"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              } transition-colors duration-200`}
              onClick={() => setActiveTab("routes")}
            >
              Route Management
            </button>
            <button
              className={`flex-1 py-2 text-center font-semibold ${
                activeTab === "employees"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              } transition-colors duration-200`}
              onClick={() => setActiveTab("employees")}
            >
              Employee Management
            </button>
            <button
              className={`flex-1 py-2 text-center font-semibold ${
                activeTab === "buses"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
              } transition-colors duration-200`}
              onClick={() => setActiveTab("buses")}
            >
              Bus Management
            </button>
          </div>

          {/* Route Management Content */}
          {activeTab === "routes" && (
            <div className="space-y-6">
              <form onSubmit={handleAddRoute} className="space-y-4">
                <input
                  type="text"
                  placeholder="Start Location"
                  value={routeData.startLocation}
                  onChange={(e) => setRouteData({ ...routeData, startLocation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <input
                  type="text"
                  placeholder="End Location"
                  value={routeData.endLocation}
                  onChange={(e) => setRouteData({ ...routeData, endLocation: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <input
                  type="number"
                  placeholder="Distance (km)"
                  value={routeData.distance}
                  onChange={(e) => setRouteData({ ...routeData, distance: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 font-semibold"
                >
                  Add Route
                </button>
              </form>
              <ul className="space-y-2">
                {routes.map((route) => (
                  <li
                    key={route.routeId}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
                  >
                    {route.startLocation} to {route.endLocation} ({route.distance} km)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Employee Management Content */}
          {activeTab === "employees" && (
            <div className="space-y-6">
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
          )}

          {/* Bus Management Content */}
          {activeTab === "buses" && (
            <div className="space-y-6">
              <form onSubmit={handleAddBus} className="space-y-4">
                <input
                  type="text"
                  placeholder="Bus Number"
                  value={busData.busNumber}
                  onChange={(e) => setBusData({ ...busData, busNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <input
                  type="text"
                  placeholder="Type"
                  value={busData.typeName}
                  onChange={(e) => setBusData({ ...busData, typeName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <input
                  type="number"
                  placeholder="Total Seats"
                  value={busData.totalSeats}
                  onChange={(e) => setBusData({ ...busData, totalSeats: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 font-semibold"
                >
                  Add Bus
                </button>
              </form>
              <ul className="space-y-2">
                {buses.map((bus) => (
                  <li
                    key={bus.busId}
                    className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
                  >
                    {bus.busNumber} ({bus.typeName}) - {bus.totalSeats} seats
                  </li>
                ))}
              </ul>
            </div>
          )}
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

export default AdminDashboard;