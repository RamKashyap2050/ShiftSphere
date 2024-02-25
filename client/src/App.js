import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ManagerHomePage from "./pages/ManagerHomePage";
import RestaurentPage from "./pages/RestaurentPage";
import LoginforAdmin from "./pages/LoginforAdmin";
import "react-toastify/dist/ReactToastify.css";
import AdminOptions from "./pages/AdminOptions";
import AdminAddRestaurent from "./pages/AdminAddRestaurent";
import AdminAddManager from "./pages/AdminAddManager";
import AdminManageWorkForce from "./pages/AdminManageWorkForce";
import AdminManageRestaurents from "./pages/AdminManageRestaurents";
import ClientLogin from "./pages/ClientLogin";
import RestaurentAddItem from "./pages/RestaurentAddItem";
import RestaurentCheckInventory from "./pages/RestaurentCheckInventory";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <div className="App">
          {/* Login Routes */}
          <Route path="/" element={<ClientLogin />} />
          <Route path="/loginadmin" element={<LoginforAdmin />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<VerifyOtp />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adminoptions" element={<AdminOptions />} />
          <Route path="/add-restaurant" element={<AdminAddRestaurent />} />
          <Route path="/add-manager" element={<AdminAddManager />} />
          <Route path="/manage-workforce" element={<AdminManageWorkForce />} />
          <Route
            path="/manage-restaurents"
            element={<AdminManageRestaurents />}
          />

          {/* Business Owner Panel Routes */}
          <Route path="/restaurent" element={<RestaurentPage />} />
          <Route path="/restaurentadditem" element={<RestaurentAddItem />} />
          <Route
            path="/restaurentinventory"
            element={<RestaurentCheckInventory />}
          />
          {/* Manager Panel Routes */}
          <Route path="/employee" element={<HomePage />} />

          {/* Employee Panel Routes */}
          <Route path="/manager" element={<ManagerHomePage />} />
        </div>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
