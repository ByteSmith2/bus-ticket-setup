// src/pages/admin/RouteManagement.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const RouteManagement = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [routeData, setRouteData] = useState({
    startLocation: "",
    endLocation: "",
    distance: "",
  });

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await api.get("/Route");
        setRoutes(response.data);
      } catch (error) {
        console.error("Failed to fetch routes:", error);
      }
    };
    fetchRoutes();
  }, []);

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

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4"
    >
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Route Management
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6">
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

export default RouteManagement;