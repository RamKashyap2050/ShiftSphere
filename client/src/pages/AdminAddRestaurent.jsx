import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Container } from "@mui/material";
import HeaderforAdmin from "../components/HeaderforAdmin";
import { useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const AdminAddRestaurant = () => {
  const navigate = useNavigate();
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantLogo, setRestaurantLogo] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [alertResponse, setAlertResponse] = useState("");

console.log(restaurantLogo,restaurantName,phone,email)

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create FormData object to send the file along with other data
    const formData = new FormData();
    formData.append("restaurantName", restaurantName);
    formData.append("restaurantLogo", restaurantLogo);
    formData.append("phone", phone);
    formData.append("email", email);
    console.log(formData)
    axios
      .post("/Admin/addRestaurent", formData)
      .then((response) => {
        console.log("Restaurant added successfully!");
        console.log("Response:", response.data);
        setShow(true);
        setAlertResponse("Restaurant Added Successfully");
        // Clear form fields after successful submission
        setRestaurantName("");
        setRestaurantLogo(null);
        setPhone("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error adding restaurant.");
        console.error("Error:", error);
        setShow(true);
        setAlertResponse("Error in adding restaurant");
      });
  };

  return (
    <div>
      <HeaderforAdmin />
      <br />
      <br />
      <Container maxWidth="sm">
        {show && (
          <Alert variant="success" style={{ width: "50%", margin: "0 auto" }}>
            {alertResponse}
          </Alert>
        )}
        <h3
          style={{
            marginTop: "2rem",
            textAlign: "center",
            marginBottom: "4rem",
          }}
        >
          Add a Restaurant
        </h3>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "400px",
            margin: "0 auto",
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Restaurant Name"
            variant="outlined"
            fullWidth
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            type="file"
            variant="outlined"
            fullWidth
            onChange={(e) => setRestaurantLogo(e.target.files[0])}
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            type="tel"
            label="Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ marginBottom: "16px" }}
          />
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "16px" }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "16px", width: "100%" }}
          >
            Add Restaurant
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default AdminAddRestaurant;
