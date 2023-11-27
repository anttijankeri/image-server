import express from "express";

import users from "./users.js";
import auth from "./auth.js";
import objects from "./objects.js";
import images from "./images.js";
import dataExport from "./dataExport.js";
import dataShare from "./dataShare.js";

const router = express.Router();

router.use("/data-share", dataShare);
router.use("/auth", auth);
router.use("/users", users);
router.use("/objects", objects);
router.use("/images", images);
router.use("/data-export", dataExport);

export default router;
