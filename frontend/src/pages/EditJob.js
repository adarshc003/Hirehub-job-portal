import React, {
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../services/api";

const EditJob = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const existingJob =
    location.state?.job;

  const [formData, setFormData] =
    useState({
      title:
        existingJob?.title || "",

      company:
        existingJob?.company || "",

      location:
        existingJob?.location || "",

      salary:
        existingJob?.salary || "",

      description:
        existingJob?.description || "",
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

      await API.put(
        `/jobs/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Job updated successfully");

      navigate("/employer-dashboard");

    } catch (error) {

      alert("Failed to update");

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

              <h2
                className="fw-bold mb-4"
                style={{
                  color: "#111827",
                }}
              >
                Edit Job
              </h2>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  className="form-control py-3 mb-3"
                  placeholder="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  style={{
                    borderRadius: "14px",
                    boxShadow: "none",
                  }}
                />

                <input
                  type="text"
                  className="form-control py-3 mb-3"
                  placeholder="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  style={{
                    borderRadius: "14px",
                    boxShadow: "none",
                  }}
                />

                <input
                  type="text"
                  className="form-control py-3 mb-3"
                  placeholder="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  style={{
                    borderRadius: "14px",
                    boxShadow: "none",
                  }}
                />

                <input
                  type="number"
                  className="form-control py-3 mb-3"
                  placeholder="Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  style={{
                    borderRadius: "14px",
                    boxShadow: "none",
                  }}
                />

                <textarea
                  className="form-control mb-4"
                  rows="5"
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  style={{
                    borderRadius: "14px",
                    boxShadow: "none",
                  }}
                ></textarea>

                <button
                  className="btn text-white w-100 py-3"
                  style={{
                    background:
                      "linear-gradient(135deg,#2563eb,#1d4ed8)",
                    border: "none",
                    borderRadius: "14px",
                  }}
                >
                  Update Job
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EditJob;