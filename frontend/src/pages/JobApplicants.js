import React, {
  useEffect,
  useState,
} from "react";

import { useParams } from "react-router-dom";

import API from "../services/api";

const JobApplicants = () => {

  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
    // eslint-disable-next-line
  }, []);

  const fetchApplicants = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        `/applications/job-applicants/${jobId}`,
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

      const token = localStorage.getItem("token");

      await API.put(
        `/applications/status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Status updated");

      fetchApplicants();

    } catch (error) {

      alert("Failed");

    }
  };

  return (

    <div className="container mt-5">

      <h2 className="fw-bold mb-4">
        Applicants
      </h2>

      <div className="row">

        {applications.map((item) => (

          <div
            className="col-md-4 mb-4"
            key={item._id}
          >

            <div className="card shadow border-0 h-100">

              <div className="card-body">

                <h5 className="fw-bold">
                  {item.candidate?.name}
                </h5>

                <p>
                  {item.candidate?.email}
                </p>

                <p>
                  Status:
                  <span className="fw-bold ms-2">
                    {item.status}
                  </span>
                </p>

                <div className="d-flex gap-2 mt-3">

                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      updateStatus(
                        item._id,
                        "Shortlisted"
                      )
                    }
                  >
                    Shortlist
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      updateStatus(
                        item._id,
                        "Rejected"
                      )
                    }
                  >
                    Reject
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default JobApplicants;