import React, { useState, useRef, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(120); // Initial timer value is 120 seconds
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const userEmail = JSON.parse(localStorage.getItem("ForgotPasswordEmail")); // Parse the stored JSON string
  const hashedmetadata = JSON.parse(
    localStorage.getItem("ForgotPasswordHash")
  );
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          // Handle timer expiration logic here
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    // Ensure value is a single digit
    if (/^\d{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input box
      if (value !== "" && index < 5) {
        refs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Join OTP array into a single string
    const enteredOtp = otp.join("");
    console.log("Verifying OTP:", enteredOtp);

    try {
      // Make a GET request to the server endpoint
      const response = await axios.get("Admin/verifyOTP", {
        params: {
          email: userEmail, // Assuming userEmail is the email state variable
          OTP: enteredOtp,
          hashedmetadata: hashedmetadata
        },
      });

      console.log("Response:", response.data);

          // Check if the response indicates success (you might need to adjust this condition based on the actual response)
    if (response.status == 200) {
        // Perform action for success, such as showing a success message, redirecting the user, etc.
        console.log("Verification successful!");
        navigate("/resetpassword")
      } else {
        // Handle other cases if necessary
        console.log("Verification failed:", response.data.message);
      }
      // Handle response data here (e.g., show success message, redirect user, etc.)
    } catch (error) {
      console.error("Error:", error.response.data);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="mt-3"
    >
      <form onSubmit={handleSubmit}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>OTP Verification</h2>
          <p>Please enter the 6-digit OTP sent to your email/mobile</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              type="tel"
              variant="outlined"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              inputProps={{
                maxLength: 1,
              }}
              style={{ width: "50px", marginRight: "10px" }}
              inputRef={refs[index]}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "100%" }}
          >
            Verify OTP
          </Button>
        </div>
        {timer > 0 ? (
          <p>Request new OTP in {timer} seconds</p>
        ) : (
          <a>Resend OTP</a>
        )}
      </form>
    </div>
  );
};

export default VerifyOtp;
