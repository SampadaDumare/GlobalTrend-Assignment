import React, { useContext, useState } from "react";
import taskContext from "../context/taskContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const context = useContext(taskContext);
  const { getAllTasks, filterTasks, isLoggedIn, logout, username } = context;
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    status: ""
  });

  const handleFilter = (e) => {
    e.preventDefault();

    filterTasks(filter.status);
  };

  const handleReset = () => {
    setFilter({ status: "" });
    getAllTasks();
  };

  const handleLogout=()=>{
    logout();
    navigate("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-dark">

      <div className="container-fluid">

        {/* Brand */}
        <Link className="navbar-brand" to="/">Tasks Manager</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          {/* Left Menu */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
          </ul>

          {/* Filter Form */}
          <form className="d-flex gap-2" onSubmit={handleFilter}>

            {/* Status */}
            <select
              className="form-select"
              value={filter.status}
              onChange={(e) =>
                setFilter({ ...filter, status: e.target.value })
              }
              style={{ width: "140px" }}
            >
              <option value="">All</option>
              <option value="ToDo">ToDo</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* Apply */}
            <button type="submit" className="btn btn-primary">
              Filter
            </button>

            {/* Reset */}
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleReset}
            >
              Reset
            </button>

          </form>
          <div className="d-flex align-items-center gap-2">

            {isLoggedIn ? (
              <>

                <button
                  className="btn btn-warning mx-2"
                  onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <div>
                <Link className="btn btn-success mx-1" to="/login">
                  Login
                </Link>

                <Link className="btn btn-danger" to="/signup">
                  Signup
                </Link>
              </div>
            )}

          </div>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
