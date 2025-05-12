import express from 'express';
import { createSiteVisit, getAllSiteVisit, updateSiteVisit, deleteSiteVisit } from "../controllers/siteVisitController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createSiteVisit", createSiteVisit);
router.get("/getAllSiteVisit", getAllSiteVisit);
//router.get("/getsiteVisitById/:id", getsiteVisitById);
router.put("/updateSiteVisit/:id",  updateSiteVisit);
router.delete("/deleteSiteVisit/:id", deleteSiteVisit);
export default router;