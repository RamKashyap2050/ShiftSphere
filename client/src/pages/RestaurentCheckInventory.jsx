import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
// import { Edit, Delete } from "@material-ui/icons";
import axios from "axios";
import HeaderforBusinessOwner from "../components/HeaderforBusinessOwner";

const RestaurentCheckInventory = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const ClientData = JSON.parse(localStorage.getItem("Client")); // Parse the stored JSON string

  useEffect(() => {
    if (!ClientData) {
      navigate("/");
    }
  }, [ClientData, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Restaurent/get_inventory");
        console.log("Data:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (productId) => {
    // Handle edit functionality for the given productId
    console.log("Edit product:", productId);
  };

  const handleDelete = async (productId) => {
    console.log(productId);
    try {
      // Assuming you have a backend endpoint to handle the delete operation
      const response = await axios.delete(
        `/Restaurent/deleteItem/${productId}`
      );
      console.log("Response from backend:", response.data);
      // Optionally, you can perform other actions after successful deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <HeaderforBusinessOwner />
      <div className="p-3">
        <Grid container spacing={4}>
          {data.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardContent>
                  <img
                    src={product.image}
                    alt="House"
                    className="product-image"
                  />
                  <Typography variant="h5" component="h2">
                    {product.product_name}
                  </Typography>
                  <Typography color="textSecondary">
                    {product.product_description}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Stock Number: {product.stock_number}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Price: {product.price}$
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    // startIcon={<Edit />}
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                    fullWidth
                  >
                    Edit
                  </Button>
                  <Button
                    // startIcon={<Delete />}
                    variant="contained"
                    color="secondary"
                    fullWidth
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    // startIcon={<Edit />}
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                    fullWidth
                  >
                    Order
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default RestaurentCheckInventory;
