const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

router.post(
  "/apply/:jobId",
  authMiddleware,
  applyJob
);

router.get(
  "/my-applications",
  authMiddleware,
  getMyApplications
);

router.get(
  "/job-applicants/:jobId",
  authMiddleware,
  getJobApplicants
);

router.put(
  "/status/:id",
  authMiddleware,
  updateApplicationStatus
);

module.exports = router;