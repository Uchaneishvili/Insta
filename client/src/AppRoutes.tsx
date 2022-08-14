import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Registration from "./pages/registration";
import User from "./pages/users";
import EditUser from "./pages/users/components/EditUser";

// Components
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
      <Route path="/users" element={<User />} />
      <Route path="/users/:id" element={<EditUser />} />
    </Routes>
  );
};
