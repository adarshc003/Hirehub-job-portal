import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

const CandidateDashboard = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const query =
    new URLSearchParams(location.search);

  const searchQuery =
    query.get("search") || "";

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [jobs, setJobs] = useState([]);

  const [selectedResume, setSelectedResume] =
    useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const response = await API.get("/jobs");

      setJobs(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const applyWithRegisteredResume =
    async (jobId) => {

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

        alert("Application submitted");

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Application failed"
        );

      }
    };

  const applyWithUpdatedResume =
    async (jobId) => {

      if (!selectedResume) {

        alert("Please upload resume");

        return;
      }

      try {

        const token =
          localStorage.getItem("token");

        const formData = new FormData();

        formData.append(
          "resume",
          selectedResume
        );

        await API.post(
          `/applications/apply/${jobId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert("Application submitted");

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Application failed"
        );

      }
    };

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.location} ${job.salary}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

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

        <div className="mb-5">

          <h2
            className="fw-bold"
            style={{
              color: "#111827",
            }}
          >
            Welcome back, {user?.name}
          </h2>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Explore the latest opportunities
          </p>

        </div>

        <div className="row">

          {filteredJobs.map((job) => (

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
                  cursor: "pointer",
                }}
                data-bs-toggle="modal"
                data-bs-target={`#jobModal${job._id}`}
              >

                <div className="card-body p-4">

                  <h4
                    className="fw-bold"
                    style={{
                      color: "#111827",
                    }}
                  >
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

                  <p className="text-muted mb-2">
                    📍 {job.location}
                  </p>

                  <p className="text-muted">
                    💰 ₹{job.salary}
                  </p>
                  <div
  className="mt-3 px-3 py-2 rounded-pill d-inline-block"
  style={{
    background:
      job.status === "closed"
        ? "#fee2e2"
        : "#dcfce7",

    color:
      job.status === "closed"
        ? "#991b1b"
        : "#166534",

    fontSize: "0.85rem",
    fontWeight: "600",
  }}
>
  {job.status}
</div>

                </div>

              </div>

              <div
                className="modal fade"
                id={`jobModal${job._id}`}
                tabIndex="-1"
              >

                <div className="modal-dialog modal-dialog-centered">

                  <div className="modal-content border-0 rounded-4">

                    <div className="modal-body p-4">

                      <div className="d-flex justify-content-between align-items-start">

                        <div>

                          <h3 className="fw-bold">
                            {job.title}
                          </h3>

                          <p
                            style={{
                              color: "#2563eb",
                              fontWeight: "500",
                            }}
                          >
                            {job.company}
                          </p>

                        </div>

                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                        ></button>

                      </div>

                      <hr />

                      <p>
                        <strong>Location:</strong>{" "}
                        {job.location}
                      </p>

                      <p>
                        <strong>Salary:</strong> ₹
                        {job.salary}
                      </p>

                      <p>
                        <strong>Description:</strong>
                      </p>

                      <p className="text-muted">
                        {job.description}
                      </p>

                      <div className="mt-4">

                        <label className="form-label fw-semibold">
                          Upload Updated Resume
                        </label>

                        <input
                          type="file"
                          className="form-control mb-3"
                          onChange={(e) =>
                            setSelectedResume(
                              e.target.files[0]
                            )
                          }
                        />

                     {(job.status || "open") ===
"closed" ? (

  <button
    className="btn btn-secondary w-100"
    disabled
  >
    Applications Closed
  </button>

) : (

  <>

    <button
      className="btn w-100 text-white mb-2"
      style={{
        background: "#2563eb",
        borderRadius: "12px",
      }}
      onClick={() =>
        applyWithUpdatedResume(job._id)
      }
    >
      Apply with Updated Resume
    </button>

    <button
      className="btn btn-outline-primary w-100"
      onClick={() =>
        applyWithRegisteredResume(job._id)
      }
    >
      Continue with Registered Resume
    </button>

  </>

)}

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default CandidateDashboard;