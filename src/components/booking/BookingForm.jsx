// src/components/booking/BookingForm.jsx
import React, { useState } from "react";
import { api } from "../../services/api";

const BookingForm = ({ buses, routes }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    dateOfBirth: "",
    email: "",
    phoneNumber: "",
    busId: "",
    routeId: "",
    seatNumber: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const seatData = { busId: formData.busId, routeId: formData.routeId, seatNumber: formData.seatNumber };
      const seatResponse = await api.post("/SeatInBusTrip", seatData);
      const bookingData = {
        customerDetails: { ...formData, seatInTripId: seatResponse.data.id },
      };
      await api.post("/Booking", bookingData);
      setMessage("Booking created successfully!");
    } catch (error) {
      setMessage("Failed to create booking.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Customer Name</label>
        <input
          type="text"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Date of Birth</label>
        <input
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block">Phone Number</label>
        <input
          type="tel"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block">Select Route</label>
        <select
          value={formData.routeId}
          onChange={(e) => setFormData({ ...formData, routeId: e.target.value })}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a route</option>
          {routes.map((route) => (
            <option key={route.routeId} value={route.routeId}>
              {route.startLocation} to {route.endLocation}
            </option>
          ))}
        </select>
      </div>
        <div>
  <label className="block">Seat Number</label>
  <select
    value={formData.seatNumber}
    onChange={(e) => setFormData({ ...formData, seatNumber: e.target.value })}
    className="w-full p-2 border rounded"
    required
  >
    <option value="">Select seat</option>
    {Array.from({ length: 40 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        Seat {i + 1}
      </option>
    ))}
  </select>
</div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Book Now
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  );
};

export default BookingForm;