import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Button,
  TextField,
  Container,
  CssBaseline,
  Typography,
  Input,
} from "@mui/material";
import HeaderforBusinessOwner from "../components/HeaderforBusinessOwner";
import axios from "axios";

const RestaurentAddItem = () => {
  const navigate = useNavigate();
  const ClientData = JSON.parse(localStorage.getItem('Client')); // Parse the stored JSON string

  useEffect(() => {
    if (!ClientData) {
      navigate('/');
    }
  }, [ClientData, navigate]);
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    // Access the first file from the FileList
    const image = data.image[0];

    console.log(
      data.product_name,
      data.product_description,
      data.stock_number,
      data.price,
      image
    );

    try {
      // Assuming you have a backend endpoint to handle the form data
      const formData = new FormData();
      formData.append("product_name", data.product_name);
      formData.append("product_description", data.product_description);
      formData.append("stock_number", data.stock_number);
      formData.append("price", data.price);
      formData.append("image", image);

      const response = await axios.post(
        "/Restaurent/restaurentadditem",
        formData
      );
      console.log("Response from backend:", response.data);
      // Optionally, you can redirect or perform other actions after successful submission
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
      <HeaderforBusinessOwner />
      <Container component="main" maxWidth="xs" style={{ marginTop: "2rem" }}>
        <CssBaseline />
        <div>
          <Typography
            component="h1"
            variant="h5"
            style={{ margin: "auto", textAlign: "center" }}
          >
            Add Inventory Item
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              margin="normal"
              fullWidth
              label="Product Name"
              {...register("product_name", { required: true })}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Product Description"
              {...register("product_description", { required: true })}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Stock Number"
              {...register("stock_number", { required: true })}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Price"
              {...register("price", { required: true })}
            />
            <br />
            <br />
            <input
              type="file"
              {...register("image", { required: true })}
              accept="image/*"
              multiple={false}
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Item
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default RestaurentAddItem;
