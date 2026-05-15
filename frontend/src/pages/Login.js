import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "candidate",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const response = await API.post(
        "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (
        response.data.user.role !== formData.role
      ) {
        setError("Incorrect role selected");
        return;
      }

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      if (response.data.user.role === "employer") {

        navigate("/employer-dashboard");

      } else {

        navigate("/candidate-dashboard");

      }

    } catch (error) {

      setError("Invalid email or password");

    }
  };

  return (

    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        paddingTop: "140px",
      }}
    >

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-5">

            <div
              className="bg-white p-5"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >

              <div className="text-center mb-4">

                <div
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: "2rem",
                    boxShadow:
                      "0 4px 15px rgba(37,99,235,0.3)",
                  }}
                >
                  🚀
                </div>

                <h2
                  className="fw-bold"
                  style={{
                    color: "#111827",
                  }}
                >
                  Welcome Back
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Login to continue to HireHub
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <input
                  type="email"
                  className="form-control py-3 mb-3"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                  }}
                />

                <input
                  type="password"
                  className="form-control py-3 mb-3"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                  }}
                />

                <select
                  className="form-select py-3 mb-3"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  style={{
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                  }}
                >

                  <option value="candidate">
                    Candidate
                  </option>

                  <option value="employer">
                    Employer
                  </option>

                </select>

                {error && (

                  <div className="alert alert-danger">

                    {error}

                  </div>

                )}

                <button
                  className="btn w-100 text-white py-3 fw-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    border: "none",
                    borderRadius: "14px",
                  }}
                >
                  Login
                </button>

              </form>

              <p
                className="text-center mt-4 mb-0"
                style={{
                  color: "#6b7280",
                }}
              >
                New user?

                <Link
                  to="/register"
                  className="ms-2 text-decoration-none fw-semibold"
                  style={{
                    color: "#2563eb",
                  }}
                >
                  Register
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;