import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";

import Jobs from "./pages/Jobs";

import MyApplications from "./pages/MyApplications";

import JobApplicants from "./pages/JobApplicants";

import CreateJob from "./pages/CreateJob";

import EditJob from "./pages/EditJob";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/employer-dashboard"
          element={<EmployerDashboard />}
        />

        <Route
          path="/candidate-dashboard"
          element={<CandidateDashboard />}
        />

        <Route path="/jobs" element={<Jobs />} />

        <Route
  path="/job-applicants/:jobId"
  element={<JobApplicants />}
/>

        <Route
  path="/my-applications"
  element={<MyApplications />}
/>

<Route
  path="/create-job"
  element={<CreateJob />}
/>

<Route
  path="/edit-job/:id"
  element={<EditJob />}
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;