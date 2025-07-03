// src/pages/booking/BookingPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

const BookingPage = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState([
    { seatInTripId: "", name: "", dateOfBirth: "", email: "", phoneNumber: "" },
  ]);
  const [message, setMessage] = useState("");

  const handleInputChange = (index, field, value) => {
    const newDetails = [...bookingDetails];
    newDetails[index][field] = value;
    setBookingDetails(newDetails);
  };

  const handleAddDetail = () => {
    setBookingDetails([...bookingDetails, { seatInTripId: "", name: "", dateOfBirth: "", email: "", phoneNumber: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Booking", { details: bookingDetails });
      setMessage(`Booking created successfully! Booking ID: ${response.data.bookingId}`);
      setBookingDetails([{ seatInTripId: "", name: "", dateOfBirth: "", email: "", phoneNumber: "" }]);
    } catch (error) {
      setMessage("Failed to create booking. Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4"
    >
      <div className="container mx-auto max-w-md">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Book Ticket
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {bookingDetails.map((detail, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="number"
                  placeholder="Seat In Trip ID"
                  value={detail.seatInTripId}
                  onChange={(e) => handleInputChange(index, "seatInTripId", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <input
                  type="text"
                  placeholder="Name"
                  value={detail.name}
                  onChange={(e) => handleInputChange(index, "name", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <input
                  type="date"
                  value={detail.dateOfBirth}
                  onChange={(e) => handleInputChange(index, "dateOfBirth", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={detail.email}
                  onChange={(e) => handleInputChange(index, "email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={detail.phoneNumber}
                  onChange={(e) => handleInputChange(index, "phoneNumber", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-200"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDetail}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 font-semibold"
            >
              Add Another Passenger
            </button>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-200 font-semibold"
            >
              Submit Booking
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

export default BookingPage;