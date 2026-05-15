import React, {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

const MyApplications = () => {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await API.get(
        "/applications/my-applications",
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

  return (

   <div
  className="container"
  style={{
    paddingTop: "150px",
  }}
>

      <h2 className="fw-bold mb-4">
        My Applications
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
                  {item.job?.title}
                </h5>

                <p className="text-muted">
                  {item.job?.company}
                </p>

                <p>
                  📍 {item.job?.location}
                </p>

                <p>
                  Status:
                  <span className="fw-bold ms-2">
                    {item.status}
                  </span>
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyApplications;