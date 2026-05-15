const Job = require("../models/Job");


// CREATE JOB
exports.createJob = async (req, res) => {

  try {

    const job = await Job.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// GET ALL JOBS
exports.getJobs = async (req, res) => {

  try {

    const { role, location, salary } = req.query;

    let filter = {};

    if (role) {
      filter.title = {
        $regex: role,
        $options: "i",
      };
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }

    if (salary) {
      filter.salary = {
        $gte: Number(salary),
      };
    }

    const jobs = await Job.find(filter);

    res.status(200).json(jobs);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// UPDATE JOB
exports.updateJob = async (req, res) => {

  try {

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Job updated successfully",
      job,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// CLOSE JOB
const closeJob = async (jobId) => {

  try {

    const token =
      localStorage.getItem("token");

    await API.put(
      `/jobs/${jobId}`,
      {
        status: "Closed",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Job closed");

    fetchJobs();

  } catch (error) {

    alert("Failed to close job");

  }
};