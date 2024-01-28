import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ManagerHomePage from "./pages/ManagerHomePage";
import RestaurentPage from "./pages/RestaurentPage";
import LoginforAdmin from "./pages/LoginforAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminOptions from "./pages/AdminOptions";
import AdminAddRestaurent from "./pages/AdminAddRestaurent";
import AdminAddManager from "./pages/AdminAddManager";
import AdminManageWorkForce from "./pages/AdminManageWorkForce";
import AdminManageRestaurents from "./pages/AdminManageRestaurents";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <div className="App">
          <Route path="/employee" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/manager" element={<ManagerHomePage />} />
          <Route path="/restaurent" element={<RestaurentPage />} />
          <Route path="/loginadmin" element={<LoginforAdmin />} />
          <Route path="/adminoptions" element={<AdminOptions />} />
          <Route path="/add-restaurant" element={<AdminAddRestaurent />} />
          <Route path="/add-manager" element={<AdminAddManager />} />
          <Route path="/manage-workforce" element={<AdminManageWorkForce />} />
          <Route path="/manage-restaurents" element={<AdminManageRestaurents />} />
        </div>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
