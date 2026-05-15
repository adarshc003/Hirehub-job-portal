import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const EmployerDashboard = () => {

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

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [applications, setApplications] =
    useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        "/jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const employerJobs =
        response.data.filter(
          (job) =>
            job.employer === user?.id ||
            job.employer?._id === user?.id
        );

      setJobs(employerJobs);

    } catch (error) {

      console.log(error);

    }
  };

  const openJobModal = async (job) => {

    setSelectedJob(job);

    try {

      const token =
        localStorage.getItem("token");

      const response = await API.get(
        `/applications/job-applicants/${job._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await API.put(
        `/applications/status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (selectedJob) {
        openJobModal(selectedJob);
      }

    } catch (error) {

      alert("Failed to update");

    }
  };

const toggleJobStatus = async (
  job
) => {

  try {

    const token =
      localStorage.getItem("token");

    const updatedStatus =
      (job.status || "open") ===
      "closed"
        ? "open"
        : "closed";

    await API.put(
      `/jobs/${job._id}`,
      {
        status: updatedStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedJobs = jobs.map(
      (singleJob) => {

        if (
          singleJob._id === job._id
        ) {

          return {
            ...singleJob,
            status: updatedStatus,
          };
        }

        return singleJob;
      }
    );

    setJobs(updatedJobs);

    setSelectedJob({
      ...job,
      status: updatedStatus,
    });

    alert(
      `Job ${updatedStatus.toLowerCase()} successfully`
    );

  } catch (error) {

    alert("Failed to update status");

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
            Manage your posted jobs
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
                data-bs-target="#jobModal"
                onClick={() =>
                  openJobModal(job)
                }
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

            </div>

          ))}

        </div>

      </div>

      <div
        className="modal fade"
        id="jobModal"
        tabIndex="-1"
      >

        <div className="modal-dialog modal-xl modal-dialog-centered">

          <div className="modal-content border-0 rounded-4">

            <div className="modal-body p-4">

              {selectedJob && (

                <>

                  <div className="d-flex justify-content-between align-items-start">

                    <div>

                      <h2 className="fw-bold">
                        {selectedJob.title}
                      </h2>

                      <p
                        style={{
                          color: "#2563eb",
                          fontWeight: "500",
                        }}
                      >
                        {selectedJob.company}
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
                    {selectedJob.location}
                  </p>

                  <p>
                    <strong>Salary:</strong> ₹
                    {selectedJob.salary}
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>

                  <p className="text-muted">
                    {selectedJob.description}
                  </p>

                <div className="d-flex gap-2 mt-3">

  <button
    className="btn btn-primary"
    style={{
      borderRadius: "12px",
    }}
    onClick={() => {

      const backdrop =
        document.querySelector(
          ".modal-backdrop"
        );

      if (backdrop) {
        backdrop.remove();
      }

      document.body.classList.remove(
        "modal-open"
      );

      document.body.style = "";

      navigate(
        `/edit-job/${selectedJob._id}`,
        {
          state: {
            job: selectedJob,
          },
        }
      );
    }}
  >
    Edit Job
  </button>

<button
  className={
    (selectedJob.status || "open") ===
    "closed"
      ? "btn btn-success"
      : "btn btn-danger"
  }
  style={{
    borderRadius: "12px",
  }}
  onClick={() =>
    toggleJobStatus(selectedJob)
  }
>
  {(selectedJob.status || "open") ===
  "closed"
    ? "Reopen Job"
    : "Close Job"}
</button>

</div>

                  <hr className="my-4" />

                  <h4 className="fw-bold mb-4">
                    Applicants
                  </h4>

                  {applications.length === 0 ? (

                    <p className="text-muted">
                      No applicants yet
                    </p>

                  ) : (

                    applications.map((item) => (

                      <div
                        key={item._id}
                        className="bg-light rounded-4 p-3 mb-3"
                      >

                        <div className="d-flex justify-content-between align-items-center">

                          <div>

                            <h5 className="fw-bold mb-1">
                              {
                                item.candidate
                                  ?.name
                              }
                            </h5>

                            <p className="text-muted mb-2">
                              {
                                item.candidate
                                  ?.email
                              }
                            </p>

                            {item.candidate
                              ?.resume && (

                              <a
                               href={`http://localhost:5000/uploads/${item.candidate.resume}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-decoration-none"
                              >
                                View Resume
                              </a>

                            )}

                          </div>

                          <div
                            style={{
                              width: "220px",
                            }}
                          >

                            <select
                              className="form-select"
                              value={item.status}
                              onChange={(e) =>
                                updateStatus(
                                  item._id,
                                  e.target.value
                                )
                              }
                            >

                              <option value="Applied">
                                Applied
                              </option>

                              <option value="Shortlisted">
                                Shortlisted
                              </option>

                              <option value="Rejected">
                                Rejected
                              </option>

                            </select>

                          </div>

                        </div>

                      </div>

                    ))

                  )}

                </>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default EmployerDashboard;