// src/pages/employee/EmployeeDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get("/Booking");
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Employee Dashboard</h2>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Recent Bookings</h3>
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="p-2 border rounded">
              {booking.customerName} - {booking.date}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        Back
      </button>
    </div>
  );
};

export default EmployeeDashboard;