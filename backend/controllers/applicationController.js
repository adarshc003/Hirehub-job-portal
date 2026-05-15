const Application = require("../models/Application");
const User = require("../models/User");
const sendEmail = require("../config/sendEmail");


// APPLY FOR JOB
exports.applyJob = async (req, res) => {

  try {

    const existingApplication = await Application.findOne({
      candidate: req.user.id,
      job: req.params.jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already applied for this job",
      });
    }

    const application = await Application.create({
      candidate: req.user.id,
      job: req.params.jobId,
    });

    res.status(201).json({
      message: "Job applied successfully",
      application,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// GET MY APPLICATIONS
exports.getMyApplications = async (req, res) => {

  try {

    const applications = await Application.find({
      candidate: req.user.id,
    })
    .populate("job");

    res.status(200).json(applications);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// GET JOB APPLICANTS
exports.getJobApplicants = async (req, res) => {

  try {

    const applications = await Application.find({
      job: req.params.jobId,
    })
    .populate("candidate");

    res.status(200).json(applications);

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// UPDATE APPLICATION STATUS
exports.updateApplicationStatus = async (req, res) => {

  try {

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    ).populate("candidate");

    await sendEmail(
      application.candidate.email,
      "Application Status Updated",
      `Your application status has been updated to ${req.body.status}`
    );

    res.status(200).json({
      message: "Application status updated",
      application,
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};