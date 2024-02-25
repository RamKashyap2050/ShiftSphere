import React, { useState, useEffect } from "react";
import HeaderforAdmin from "../components/HeaderforAdmin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
const AdminAddManager = () => {
  const [managerName, setManagerName] = useState("");
  const [managerPhone, setManagerPhone] = useState("");
  const [email, setManagerEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const AdminData = localStorage.getItem("Admin");
  console.log(AdminData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!AdminData) {
      navigate("/loginadmin");
    }
  }, [AdminData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employee_name", managerName);
    formData.append("phone", managerPhone);
    formData.append("email", email);
    formData.append("employee_role",selectedRole);
    formData.append("RestaurentID", selectedRestaurent);

    console.log(managerName, managerPhone, email, selectedRestaurent);

    try {
      const response = await axios.post("/Admin/addManager", formData);

      console.log("Product submission successful!");
      console.log("Response:", response.data);

      setManagerName("");
      setManagerPhone("");
      setManagerEmail("");
    } catch (error) {
      console.error("Product submission failed.");
      console.error("Error:", error);
    }
  };
  const [restaurents, setRestaurent] = useState([]);
  const [selectedRestaurent, setSelectedRestaurent] = useState("");

  useEffect(() => {
    axios
      .get("/Admin/getrestaurent")
      .then((response) => {
        setRestaurent(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <HeaderforAdmin />
      <br />
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" gutterBottom>
          Add Manager
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Manager Name"
            value={managerName}
            onChange={(e) => setManagerName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Manager Phone Number"
            multiline
            value={managerPhone}
            onChange={(e) => setManagerPhone(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Manager Email"
            value={email}
            onChange={(e) => setManagerEmail(e.target.value)}
          />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="category-label">Role</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                fullWidth
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <MenuItem value="">Select an Option</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
                <MenuItem value="BusinessOwner">Business Owner</MenuItem>
                <MenuItem value="Chef">Chef</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="restaurant-label">Restaurant</InputLabel>
              <Select
                labelId="restaurant-label"
                id="restaurant"
                fullWidth
                value={selectedRestaurent}
                onChange={(e) => setSelectedRestaurent(e.target.value)}
              >
                <MenuItem value="">Select an Option</MenuItem>
                {restaurents.map((val) => (
                  <MenuItem key={val._id} value={val._id}>
                    {val.Restaurent_name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "16px" }}
          >
            Add Manager
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AdminAddManager;
