import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderforBusinessOwner from "../components/HeaderforBusinessOwner";
const RestaurentPage = () => {
  const ClientData = JSON.parse(localStorage.getItem("Client")); // Parse the stored JSON string
  const navigate = useNavigate();

  useEffect(() => {
    if (!ClientData) {
      navigate("/");
    }
  }, [ClientData, navigate]);

  const onLogout = () => {
    localStorage.removeItem("Client");
    navigate("/");
  };
  return (
    <div>
      <HeaderforBusinessOwner />
      <h1>
        Hi this is Client, {ClientData.user_name}I am {ClientData.employee_role}{" "}
        of {ClientData.restaurent_name}
      </h1>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default RestaurentPage;
