import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    companyName: "",
  });

  const [resume, setResume] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter valid email";
    }

    if (formData.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (
      formData.role === "candidate" &&
      !resume
    ) {
      newErrors.resume =
        "Resume upload is required";
    }

    if (
      formData.role === "employer" &&
      !formData.companyName.trim()
    ) {
      newErrors.companyName =
        "Company name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);

      if (resume) {
        data.append("resume", resume);
      }

      const response = await API.post(
        "/auth/register",
        data
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (

    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        paddingTop: "140px",
        paddingBottom: "50px",
      }}
    >

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-md-6">

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
                  Create Account
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Join HireHub and explore opportunities
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  className="form-control py-3 mb-1"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "14px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "none",
                  }}
                />

                <small className="text-danger d-block mb-3">
                  {errors.name}
                </small>

                <input
                  type="email"
                  className="form-control py-3 mb-1"
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

                <small className="text-danger d-block mb-3">
                  {errors.email}
                </small>

                <input
                  type="password"
                  className="form-control py-3 mb-1"
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

                <small className="text-danger d-block mb-3">
                  {errors.password}
                </small>

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

                {formData.role === "candidate" && (

                  <>

                    <input
                      type="file"
                      className="form-control py-3 mb-1"
                      onChange={(e) =>
                        setResume(e.target.files[0])
                      }
                      required
                      style={{
                        borderRadius: "14px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                      }}
                    />

                    <small className="text-danger d-block mb-3">
                      {errors.resume}
                    </small>

                  </>

                )}

                {formData.role === "employer" && (

                  <>

                    <input
                      type="text"
                      className="form-control py-3 mb-1"
                      placeholder="Company Name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "14px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "none",
                      }}
                    />

                    <small className="text-danger d-block mb-3">
                      {errors.companyName}
                    </small>

                  </>

                )}

                <button
                  className="btn w-100 text-white py-3 fw-semibold mt-2"
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    border: "none",
                    borderRadius: "14px",
                  }}
                >
                  Register
                </button>

              </form>

              <p
                className="text-center mt-4 mb-0"
                style={{
                  color: "#6b7280",
                }}
              >
                Already have an account?

                <Link
                  to="/login"
                  className="ms-2 text-decoration-none fw-semibold"
                  style={{
                    color: "#2563eb",
                  }}
                >
                  Login
                </Link>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;