import express from "express";
import auth from "./auth";
import users from "./users";
import objects from "./objects";
import pics from "./pics";

const router = express.Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/objects", objects);
router.use("/images", pics);

export default router;
