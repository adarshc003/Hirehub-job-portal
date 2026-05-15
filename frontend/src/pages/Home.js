import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import {
  useNavigate,
} from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

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

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.location} ${job.salary}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const suggestions = [
    "All",
    "Remote",
    "MERN Stack",
    "Frontend",
    "Backend",
    "Internship",
    "React",
    "Node.js",
    "Fresher",
  ];

  return (

    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        paddingTop: "150px",
        paddingBottom: "50px",
      }}
    >

      <div className="container">

        <div className="text-center mb-5">

          <h1
            className="fw-bold"
            style={{
              fontSize: "3rem",
              color: "#111827",
            }}
          >
            Find your dream job
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "1.1rem",
            }}
          >
            Discover jobs from startups and top companies
          </p>

        </div>

        {!localStorage.getItem("token") && (

          <div
            className="bg-white shadow-sm p-3 rounded-5 mb-5"
          >

            <input
              type="text"
              className="form-control border-0"
              placeholder="Search jobs..."
              style={{
                fontSize: "1rem",
                boxShadow: "none",
              }}
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        )}

        <div className="d-flex justify-content-center flex-wrap gap-3 mb-5">

          {suggestions.map((item, index) => (

            <div
              key={index}
              className="px-4 py-2 bg-white rounded-pill shadow-sm"
              style={{
                cursor: "pointer",
                color: "#374151",
                fontWeight: "500",
              }}
              onClick={() =>
                item === "All"
                  ? setSearch("")
                  : setSearch(item)
              }
            >
              {item}
            </div>

          ))}

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

                      {!localStorage.getItem("token") ? (

                        <button
                          className="btn w-100 text-white mt-3"
                          style={{
                            background: "#2563eb",
                            borderRadius: "12px",
                          }}
                          onClick={() =>
                            navigate("/login")
                          }
                        >
                          Login to Apply
                        </button>

                      ) : (

                        <>

                          <label className="form-label fw-semibold mt-3">
                            Upload Resume
                          </label>

                          <input
                            type="file"
                            className="form-control mb-3"
                          />

                          <button
                            className="btn w-100 text-white mb-2"
                            style={{
                              background: "#2563eb",
                              borderRadius: "12px",
                            }}
                          >
                            Apply with Uploaded Resume
                          </button>

                          <button
                            className="btn btn-outline-primary w-100"
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

          ))}

        </div>

      </div>

    </div>
  );
};

export default Home;