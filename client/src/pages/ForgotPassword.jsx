import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
  
    if (email === "") {
      toast.error("Email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("Please include @ in your email!", {
        position: "top-center",
      });
    } else {
      const res = await fetch(`/Admin/clientchangepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await res.json();
      console.log(data);
      if (data.email && data.hashedmetadata) {
        const { email, hashedmetadata } = data; // Destructuring email and hash from data object
        setEmail("");
        setMessage(true);
        toast.success("Password reset link sent successfully to your email!", {
          position: "top-center",
        });
        localStorage.setItem("ForgotPasswordEmail", JSON.stringify(email));
        localStorage.setItem("ForgotPasswordHash", JSON.stringify(hashedmetadata));
        navigate("/verifyotp");
      } else {
        toast.error("Invalid User", {
          position: "top-center",
        });
      }
    }
  };
  

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <section>
              <div className="form">
                <div className="form_heading">
                  <h3>Forgot your Password?</h3>
                </div>

                {message ? (
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    Password reset link sent successfully to your email!
                  </p>
                ) : (
                  ""
                )}
                <form className="mt-3">
                  <div className="form-group">
                    <TextField
                      type="email"
                      value={email}
                      onChange={setVal}
                      name="email"
                      id="email"
                      label="Enter Your Email Address"
                      variant="outlined"
                      fullWidth
                      className="form-control"
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={sendLink}
                  >
                    Send
                  </Button>
                </form>
                <ToastContainer />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
