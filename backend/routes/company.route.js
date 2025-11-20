import express from "express";
import isAuthenticated from "../middleware/isAuthenticate.js";
import {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/company.controller.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get").post(isAuthenticated, getCompany);
router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").post(isAuthenticated, updateCompany);

export default router;
