import express from "express";

import users from "./users";
import auth from "./auth";
import objects from "./objects";
import images from "./images";
import dataExport from "./dataExport";
import dataShare from "./dataShare";

const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/objects", objects);
router.use("/images", images);
router.use("/data-export", dataExport);
router.use("/data-share", dataShare);

export default router;
