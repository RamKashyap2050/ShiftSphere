import React from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';

const ResetPassword = () => {
  return (
    <Container maxWidth="xs" style={{ marginTop: '4rem' }}>
      <Typography variant="h4" style={{ marginBottom: '2rem' }} align="center">
        Reset Your Password
      </Typography>
      <form style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="New Password"
              name="password"
              type="password"
              autoComplete="new-password"
              style={{ marginBottom: '2rem' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="confirmPassword"
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              style={{ marginBottom: '2rem' }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '2rem' }}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default ResetPassword;
