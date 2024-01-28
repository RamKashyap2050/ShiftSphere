import React, { useEffect, useState } from "react";
import HeaderforAdmin from "../components/HeaderforAdmin";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button
} from "@mui/material";

const AdminManageWorkForce = () => {
  const AdminData = localStorage.getItem("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    if (!AdminData) {
      navigate("/loginadmin");
    }
  }, [AdminData, navigate]);

  const [workforce, setWorkforce] = useState([]);

  useEffect(() => {
    axios
      .get("/Admin/getworkforce")
      .then((response) => {
        setWorkforce(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <HeaderforAdmin />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Employee Role</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workforce.map((employee) => (
              <TableRow key={employee._id}>
            
                <TableCell>    <img
                    src={employee.RestaurentID.Restaurent_Logo}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  />{" "}{" "}{employee.RestaurentID.Restaurent_name}</TableCell>
                <TableCell>{employee.employee_name}</TableCell>
                <TableCell>{employee.employee_role}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell><Button variant="contained" color="error">Remove</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {workforce.length === 0 && (
        <Typography variant="h6" align="center" style={{ margin: "20px" }}>
          No workforce data available.
        </Typography>
      )}
    </div>
  );
};

export default AdminManageWorkForce;
