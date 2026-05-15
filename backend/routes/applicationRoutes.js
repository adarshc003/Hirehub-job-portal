const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");
const {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
} = require("../controllers/applicationController");

router.post(
  "/apply/:jobId",
  authMiddleware,
  upload.single("resume"),
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