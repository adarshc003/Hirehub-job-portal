const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  updateJob,
} = require("../controllers/jobController");

router.post("/", authMiddleware, createJob);

router.get("/", getJobs);

router.put("/:id", authMiddleware, updateJob);



module.exports = router;