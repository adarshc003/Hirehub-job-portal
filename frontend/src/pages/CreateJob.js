import React, {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

const CreateJob = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        "/jobs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Job created successfully"
      );

      navigate("/employer-dashboard");

    } catch (error) {

      alert("Failed to create job");

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

          <div className="col-md-7">

            <div
              className="bg-white p-5"
              style={{
                borderRadius: "24px",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.06)",
              }}
            >

              <div className="mb-4">

                <h2
                  className="fw-bold"
                  style={{
                    color: "#111827",
                  }}
                >
                  Create New Job
                </h2>

                <p
                  style={{
                    color: "#6b7280",
                  }}
                >
                  Add a new job opportunity
                </p>

              </div>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Job Title
                  </label>

                  <input
                    type="text"
                    className="form-control py-3"
                    placeholder="Enter job title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "14px",
                      boxShadow: "none",
                    }}
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Company Name
                  </label>

                  <input
                    type="text"
                    className="form-control py-3"
                    placeholder="Enter company name"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "14px",
                      boxShadow: "none",
                    }}
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Location
                  </label>

                  <input
                    type="text"
                    className="form-control py-3"
                    placeholder="Enter location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "14px",
                      boxShadow: "none",
                    }}
                  />

                </div>

                <div className="mb-3">

                  <label className="form-label fw-semibold">
                    Salary
                  </label>

                  <input
                    type="number"
                    className="form-control py-3"
                    placeholder="Enter salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "14px",
                      boxShadow: "none",
                    }}
                  />

                </div>

                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Description
                  </label>

                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Enter job description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={{
                      borderRadius: "14px",
                      boxShadow: "none",
                    }}
                  ></textarea>

                </div>

                <button
                  className="btn text-white w-100 py-3 fw-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    border: "none",
                    borderRadius: "14px",
                  }}
                >
                  Create Job
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CreateJob;