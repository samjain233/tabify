import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addTab,removeTab } from "../controllers/tab.controller.js";

const router=Router()
router.route("/addtab").post(verifyJWT,addTab)
router.route("/removetab").post(verifyJWT,removeTab)

export default router