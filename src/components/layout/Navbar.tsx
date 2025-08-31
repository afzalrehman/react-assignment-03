import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import type { AppDispatch, RootState } from "@/app/store";

const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold text-green-600">MultiCrude</Link>

        <div className="hidden md:flex space-x-6 items-center">
          {isLoggedIn && (
            <>
              <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</Link>
              <Button onClick={handleLogout} className="bg-green-600 hover:bg-green-700 text-white">
                Logout
              </Button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link to="/login" className="text-gray-700 hover:text-green-600 transition-colors">Login</Link>
              <Link to="/signup" className="text-gray-700 hover:text-green-600 transition-colors">Sign Up</Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
