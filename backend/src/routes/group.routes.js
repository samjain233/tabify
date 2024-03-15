import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createGroup,deleteGroup } from "../controllers/group.controller.js";

const router=Router()
router.route("/addgroup").post(verifyJWT,createGroup)
router.route("/removegroup").post(verifyJWT,deleteGroup)
export default router