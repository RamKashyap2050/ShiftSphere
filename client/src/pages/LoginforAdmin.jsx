import React from "react";
import { Link } from "react-router-dom"; // Make sure to import Link from 'react-router-dom'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const adminData = {
      email,
      password,
    };

    try {
      const response = await axios.post(`/Admin/login/`, adminData);
      console.log("Response from backend:", response.data);
      navigate('/admin');
      localStorage.setItem("Admin", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <section className="heading text-center mt-5">
              <h1>Admin Login</h1>
            </section>
            <hr className="my-4" />
            <section className="form">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Enter your email"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </div>
              </form>
              <p className="text-center">
                <Link to="/forgotpasswordAdmin">Forgot Password?</Link>
              </p>
              <p className="text-center">
                <Link to="/">Go Back to Landing Page</Link>
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
