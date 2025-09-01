import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "lucide-react";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import SettingsPage from "./pages/SettingsPage";
import Profilepage from "./pages/Profilepage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Toaster} from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore";

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const {theme}=useThemeStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LogInPage /> : <Navigate to="/" />}
        />
        <Route path="/settings" element={<SettingsPage />} />
        <Route
          path="/profile"
          element={authUser ? <Profilepage /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster/>
    </div>
  );
}
