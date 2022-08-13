import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration";

// Components
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />
    </Routes>
  );
};
