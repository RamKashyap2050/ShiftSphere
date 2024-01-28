// DashboardCard.jsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ title, value, color }) => {
    const valueTypographyStyle = {
        fontSize: '2.5rem', // Adjust the font size as needed
        fontFamily: 'Roboto', // Replace 'YourStylishFont' with the actual font you want to use
        // Add any other styling you desire for the numbers here
      };
  return (
    <Card style={{ backgroundColor: color, color: "white" }}>
    <CardContent>
      <Typography variant="h4" component="div" style={valueTypographyStyle}>
        {value}
      </Typography>
      <Typography variant="p" component="div">
        {title}
      </Typography>
    </CardContent>
  </Card>
  );
};

export default DashboardCard;
