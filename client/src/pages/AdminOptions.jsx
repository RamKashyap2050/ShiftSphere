import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../ShiftSphere.jpg";
import HeaderforAdmin from "../components/HeaderforAdmin";
import { Button, Card, CardContent, Grid } from "@mui/material";

const AdminOptions = () => {
  const adminDataString = localStorage.getItem("Admin");
  const adminData = adminDataString ? JSON.parse(adminDataString) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminData) {
      navigate("/loginadmin");
    }
  }, [adminData, navigate]);

 const handleLogout = () => {
    localStorage.removeItem("Admin")
    navigate("/loginadmin")
 }
  return (
    <div>
      <HeaderforAdmin />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={Logo} alt="hello" className="admin-dashboard-photo" />
      </div>

      <div style={{ maxWidth: "80%", margin: "auto" }}>
        <Card>
          <CardContent>
            <h1 className="card-title">Admin Profile</h1>
            {adminData && (
              <>
                <p>
                  <strong>Name:</strong> {adminData.user_name}
                </p>
                <p>
                  <strong>Email:</strong> {adminData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {adminData.phone}
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="mt-3">
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ borderRadius: 20 }}
                  onClick={() => navigate("/manage-restaurents")}
                >
                  Manage Restaurents
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  style={{ borderRadius: 20 }}
                  onClick={() => navigate("/manage-workforce")}
                >
                  Manage Workforce
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ borderRadius: 20 }}
                  onClick={() => navigate("/check-out-team")}
                >
                  Check Out Team (Admins Team)
                </Button>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  style={{ borderRadius: 20 }}
                  onClick={() => navigate("/add-restaurant")}
                >
                  Add Restaurant
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  style={{ borderRadius: 20 }}
                  onClick={() => navigate("/add-manager")}
                >
                  Add Manager
                </Button>
              </Grid>

           
            </Grid>
          </CardContent>
        </Card>

        
        <Card className="mt-3">
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ borderRadius: 20 }}
                  onClick={() => navigate("/add-restaurant")}
                >
                  Edit Profile 
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  style={{ borderRadius: 20 }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOptions;
