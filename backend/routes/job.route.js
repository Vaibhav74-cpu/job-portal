import express from "express";
import isAuthenticated from "../middleware/isAuthenticate.js";
import {postJob, getAllJobs,getjobById,adminJobs} from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/get/:id").get(isAuthenticated, getjobById);
router.route("/getAdminJobs").get(isAuthenticated, adminJobs);

export default router;
 