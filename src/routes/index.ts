import express from "express";

import users from "./users.js";
import auth from "./auth.js";
import objects from "./objects.js";
import images from "./images.js";
import dataExport from "./dataExport.js";
import dataShare from "./dataShare.js";

const router = express.Router();

router.use("/data-share", dataShare);
router.use("/users", auth, users);
router.use("/objects", auth, objects);
router.use("/images", auth, images);
router.use("/data-export", auth, dataExport);

export default router;
