// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import HomeContainer from "./pages/home_container/HomeContainer";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import BookingPage from "./pages/booking/BookingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CancelBooking from "./pages/booking/CancelBooking";
import TicketDisplay from "./pages/booking/TicketDisplay";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomeContainer />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/booking"
                element={
                  <ProtectedRoute allowedRoles={["Admin", "Employee"]}>
                    <BookingPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={["Admin"]}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee"
                element={
                  <ProtectedRoute allowedRoles={["Employee"]}>
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cancel-booking"
                element={
                  <ProtectedRoute allowedRoles={["Admin", "Employee"]}>
                    <CancelBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ticket-display"
                element={
                  <ProtectedRoute allowedRoles={["Admin", "Employee"]}>
                    <TicketDisplay />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;