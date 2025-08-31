import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

import Home from "./pages/Home";
import RecipeDetails from "./pages/Recipe";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./components/layout/Navbar";
import StudentListPage from "./pages/student/StudentListPage";
import AddStudentPage from "./pages/student/AddStudentPage";
import EditStudentPage from "./pages/student/EditStudentPage";

const App: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="">
      <Navbar />
      <Routes>
        {/* Protected routes */}
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/recipe" element={isLoggedIn ? <RecipeDetails /> : <Navigate to="/login" />} />
        <Route path="/students" element={isLoggedIn ? <StudentListPage /> : <Navigate to="/login" />} />
        <Route path="/add-student" element={isLoggedIn ? <AddStudentPage /> : <Navigate to="/login" />} />
        <Route path="/edit-student/:id" element={isLoggedIn ? <EditStudentPage /> : <Navigate to="/login" />} />

        {/* Public routes */}
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!isLoggedIn ? <SignUp /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
