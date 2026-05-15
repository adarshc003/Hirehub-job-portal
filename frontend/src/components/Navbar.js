import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [search, setSearch] = useState("");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleSearch = (value) => {

    setSearch(value);

    if (user?.role === "candidate") {

      navigate(
        `/candidate-dashboard?search=${value}`
      );

    } else {

      navigate(
        `/employer-dashboard?search=${value}`
      );

    }
  };

  return (

    <div
      className="d-flex justify-content-center"
      style={{
        position: "fixed",
        top: "20px",
        left: "0",
        right: "0",
        zIndex: "1000",
      }}
    >

      <nav
        className="navbar navbar-expand-lg px-4 py-3 rounded-5"
        style={{
          width: "92%",
          background:
            "rgba(255,255,255,0.75)",
          backdropFilter: "blur(14px)",
          border:
            "1px solid rgba(0,0,0,0.05)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.08)",
        }}
      >

        <div className="container-fluid">

          <Link
            className="navbar-brand fw-bold d-flex align-items-center gap-3"
            to={
              !token
                ? "/"
                : user?.role === "employer"
                ? "/employer-dashboard"
                : "/candidate-dashboard"
            }
            style={{
              color: "#111827",
              fontSize: "1.4rem",
              textDecoration: "none",
            }}
          >

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg,#2563eb,#1d4ed8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
              }}
            >
              🚀
            </div>

            HireHub

          </Link>

          {token && (

            <div
              className="mx-auto d-none d-lg-block"
              style={{
                width: "420px",
              }}
            >

              <div
                className="d-flex align-items-center px-3"
                style={{
                  background: "#f3f4f6",
                  borderRadius: "16px",
                  height: "48px",
                }}
              >

                <span className="me-2">
                  🔍
                </span>

                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
                  style={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
                />

              </div>

            </div>

          )}

          <div className="d-flex align-items-center gap-3">

            {user?.role === "employer" && (

              <button
                className="btn text-white"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  border: "none",
                  borderRadius: "14px",
                }}
                onClick={() =>
                  navigate("/create-job")
                }
              >
                + Create Job
              </button>

            )}

            {!token ? (

              <Link
                to="/login"
                className="btn text-white px-4 py-2"
                style={{
                  background:
                    "linear-gradient(135deg,#2563eb,#1d4ed8)",
                  borderRadius: "14px",
                }}
              >
                Login
              </Link>

            ) : (

              <div className="dropdown">

                <button
                  className="btn dropdown-toggle"
                  data-bs-toggle="dropdown"
                  style={{
                    background: "#f3f4f6",
                    borderRadius: "14px",
                  }}
                >
                  {user?.name}
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end border-0 shadow"
                  style={{
                    borderRadius: "14px",
                  }}
                >

                  {user?.role === "candidate" && (

  <li>

    <Link
      to="/my-applications"
      className="dropdown-item"
    >
      My Applications
    </Link>

  </li>

)}

                  <li>

                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>

                  </li>

                </ul>

              </div>

            )}

          </div>

        </div>

      </nav>

    </div>
  );
};

export default Navbar;