import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import API from "../services/api";

const Jobs = () => {

  const locationHook = useLocation();

  const queryParams = new URLSearchParams(
    locationHook.search
  );

  const [jobs, setJobs] = useState([]);

  const [filters] = useState({
    role: queryParams.get("role") || "",
    location:
      queryParams.get("location") || "",
    salary:
      queryParams.get("salary") || "",
  });

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line
  }, [locationHook.search]);

  const fetchJobs = async () => {

    try {

      const response = await API.get("/jobs");

      let filtered = response.data;

      if (filters.role) {
        filtered = filtered.filter((job) =>
          job.title
            .toLowerCase()
            .includes(filters.role.toLowerCase())
        );
      }

      if (filters.location) {
        filtered = filtered.filter((job) =>
          job.location
            .toLowerCase()
            .includes(
              filters.location.toLowerCase()
            )
        );
      }

      if (filters.salary) {
        filtered = filtered.filter(
          (job) =>
            Number(job.salary) >=
            Number(filters.salary)
        );
      }

      setJobs(filtered);

    } catch (error) {

      console.log(error);

    }
  };

  const applyJob = async (jobId) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.post(
        `/applications/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applied successfully");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Application failed"
      );

    }
  };

  return (

    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "50px",
      }}
    >

      <div className="container">

        <h2
          className="fw-bold mb-5"
          style={{
            color: "#111827",
          }}
        >
          Available Jobs
        </h2>

        <div className="row">

          {jobs.map((job) => (

            <div
              className="col-md-4 mb-4"
              key={job._id}
            >

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: "20px",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.06)",
                }}
              >

                <div className="card-body p-4">

                  <h4 className="fw-bold">
                    {job.title}
                  </h4>

                  <p
                    style={{
                      color: "#2563eb",
                      fontWeight: "500",
                    }}
                  >
                    {job.company}
                  </p>

                  <p className="text-muted">
                    📍 {job.location}
                  </p>

                  <p className="text-muted">
                    💰 ₹{job.salary}
                  </p>

                  <p>
                    {job.description}
                  </p>

                  <button
                    className="btn w-100 mt-3 text-white"
                    style={{
                      background: "#2563eb",
                      borderRadius: "12px",
                    }}
                    onClick={() =>
                      applyJob(job._id)
                    }
                  >
                    Apply Now
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Jobs;