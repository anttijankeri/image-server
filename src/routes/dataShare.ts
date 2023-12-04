import express from "express";
import { SHARING_ALLOWED } from "../config.js";
import { getImagesDb, getObjectsDb } from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

const isAllowed = (shared: boolean) => {
  return SHARING_ALLOWED && shared;
};

router.get("/objects/:userFolder/:id", async (req, res, next) => {
  try {
    const db = getObjectsDb();
    const data = await db
      .collection(req.params.userFolder)
      .findOne({ _id: new ObjectId(req.params.id) });

    if (data && isAllowed(data.shared)) {
      return res.json(data);
    }

    res.status(404).send("Not found");
  } catch (error) {
    next(error);
  }
});

router.get("/images/:userFolder/:id", async (req, res, next) => {
  try {
    const db = getImagesDb();
    const data = await db
      .collection(req.params.userFolder)
      .findOne({ _id: new ObjectId(req.params.id) });

    if (data && isAllowed(data.shared)) {
      return res.json(data);
    }

    res.status(404).send("Not found");
  } catch (error) {
    next(error);
  }
});

export default router;
