// src/components/admin/BusManagement.jsx
import React, { useState } from "react";
import { api } from "../../services/api";

const BusManagement = ({ buses, setBuses }) => {
  const [busData, setBusData] = useState({ busNumber: "", typeName: "", totalSeats: "" });

 const handleAddBus = async (e) => {
  e.preventDefault();
  if (!busData.busNumber || !busData.typeName || !busData.totalSeats) {
    console.error("All fields (busNumber, typeName, totalSeats) are required");
    return;
  }
  try {
    console.log("Sending bus data:", busData); // Log dữ liệu gửi lên
    const response = await api.post("/Bus", busData);
    setBuses([...buses, response.data]);
    setBusData({ busNumber: "", typeName: "", totalSeats: "" });
  } catch (error) {
    console.error("Error adding bus:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data, // Log chi tiết lỗi từ server
      config: error.config,
    });
  }
};
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Manage Buses</h3>
      <form onSubmit={handleAddBus} className="space-y-2">
        <input
          type="text"
          placeholder="Bus Number"
          value={busData.busNumber}
          onChange={(e) => setBusData({ ...busData, busNumber: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={busData.typeName}
          onChange={(e) => setBusData({ ...busData, typeName: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Total Seats"
          value={busData.totalSeats}
          onChange={(e) => setBusData({ ...busData, totalSeats: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Add Bus
        </button>
      </form>
      <ul>
        {buses.map((bus) => (
          <li key={bus.busId} className="p-2 border rounded">
            {bus.busNumber} ({bus.typeName}) - {bus.totalSeats} seats
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusManagement;