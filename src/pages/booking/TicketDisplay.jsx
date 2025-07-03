// src/pages/booking/TicketDisplay.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const TicketDisplay = () => {
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  const handleFetchTicket = async () => {
    if (!bookingId) {
      setMessage("Please enter a Booking ID.");
      return;
    }
    try {
      const response = await api.get(`/Booking/${bookingId}/ticket`, {
        responseType: "blob", // Nhận file dưới dạng binary
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Ticket_${bookingId}.pdf`); // Tên file tải về
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link); // Xóa link sau khi tải
      window.URL.revokeObjectURL(url); // Giải phóng bộ nhớ
      setMessage("Ticket downloaded successfully!");
    } catch (error) {
      setMessage("No ticket found for this ID. Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4"
    >
      <div className="container mx-auto max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Ticket Display
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6">
          <input
            type="text"
            placeholder="Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
            required
          />
          <button
            onClick={handleFetchTicket}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 font-semibold"
          >
            Download Ticket
          </button>
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

export default TicketDisplay;