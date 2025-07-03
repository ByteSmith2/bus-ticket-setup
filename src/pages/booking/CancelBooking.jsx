// src/pages/booking/CancelBooking.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const CancelBooking = () => {
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  const handleCancelBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/Booking/${bookingId}/cancel`);
      setMessage("Booking canceled successfully! Refund: " + response.data.refundAmount);
      setBookingId("");
    } catch (error) {
      setMessage("Failed to cancel booking. Please check the booking ID. Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4"
    >
      <div className="container mx-auto max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Cancel Booking
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6">
          <form onSubmit={handleCancelBooking} className="space-y-4">
            <input
              type="text"
              placeholder="Booking ID"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-200 font-semibold"
            >
              Cancel Booking
            </button>
          </form>
          {message && <p className={message.includes("success") ? "text-green-500" : "text-red-500"}>{message}</p>}
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

export default CancelBooking;