import express from "express";
import {
  createPateint,
  getPateints,
  getPateint,
  updatePateint,
  deletePateint,
  updateProfile
} from "../controller.ts/doctor";
import authMiddleware from "../middleware/auth";
const router = express.Router();

router.route("/create-pateint").post([authMiddleware], createPateint);
router.route("/pateints").get([authMiddleware], getPateints);
router
  .route("/pateint/:id")
  .get([authMiddleware], getPateint)
  .put([authMiddleware], updatePateint)
  .delete([authMiddleware], deletePateint)

  router.route("/update/:id").put([authMiddleware], updateProfile);

export default router;
