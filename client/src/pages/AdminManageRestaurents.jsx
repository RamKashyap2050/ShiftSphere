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
} from "@mui/material";

const AdminManageRestaurents = () => {
  const AdminData = localStorage.getItem("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    if (!AdminData) {
      navigate("/loginadmin");
    }
  }, [AdminData, navigate]);

  const [restaurent, setRestaurent] = useState([]);

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
    <div>
      <HeaderforAdmin />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant Logo</TableCell>
              <TableCell>Restaurent Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurent.map((val) => (
              <TableRow key={val._id}>
            
                <TableCell>    <img
                    src={val.Restaurent_Logo}
                    alt="Logo"
                    style={{ width: "50px", height: "50px" }}
                  />{" "}{" "}</TableCell>
                <TableCell>{val.Restaurent_name}</TableCell>
                <TableCell>{val.Restaurent_phone}</TableCell>
                <TableCell>{val.Restaurent_email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {restaurent.length === 0 && (
        <Typography variant="h6" align="center" style={{ margin: "20px" }}>
          No Restaurent data available.
        </Typography>
      )}
    </div>
  );
};

export default AdminManageRestaurents;
