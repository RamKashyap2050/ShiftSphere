// AdminPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import HeaderforAdmin from '../components/HeaderforAdmin';
import DashboardCard from '../components/DashboardCard';

const AdminPage = () => {
  const AdminData = localStorage.getItem('Admin');
  const navigate = useNavigate();

  useEffect(() => {
    if (!AdminData) {
      navigate('/loginadmin');
    }
  }, [AdminData, navigate]);

  return (
    <div>
      <HeaderforAdmin />
      <Container style={{ marginTop: '2rem' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard title="Restaurants on App" value="100" color="#3498db" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard title="Employee Workforce" value="500" color="#2ecc71" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard title="Announcements Made" value="20" color="#e74c3c" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardCard title="Total Employee Working Hours" value="20000 hours" color="#e67e22" />
          </Grid>
          <Grid item xs={12} md={6}>
            <DashboardCard title="Managers" value="46" color="#3498db" />
          </Grid>
          {/* Additional Cards */}
          <Grid item xs={12} sm={6} md={4}>
            <DashboardCard title="Business Owners" value="125" color="#9b59b6" />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <DashboardCard title="Rating" value="4.9/5" color="#27ae60" />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminPage;
