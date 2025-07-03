// src/hooks/useAuth.js
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "../services/api";

const useAuth = () => {
  const { user, token, login, logout } = useContext(AuthContext);

  // Đồng bộ token với header API khi thay đổi
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Hàm kiểm tra trạng thái xác thực và đồng bộ từ localStorage
  const checkAuth = () => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedRole && storedUsername && !user) {
      login(storedUsername, "", { role: storedRole, token: storedToken }); // Giả định login không yêu cầu password khi đồng bộ
    }
  };

  // Gọi checkAuth khi hook được mount
  useEffect(() => {
    checkAuth();
  }, []); // Chỉ chạy một lần khi component mount

  return {
    user,
    token,
    login,
    logout,
    checkAuth, // Có thể sử dụng để kiểm tra lại thủ công nếu cần
    isAuthenticated: !!token, // Trả về boolean để kiểm tra trạng thái đã xác thực
    isAdmin: user?.role === "Admin", // Kiểm tra vai trò Admin
  };
};

export default useAuth;