import express from "express";
import { getObjectsDb } from "../db.js";
import { ObjectId } from "mongodb";
import { validateData, validateDataPartial } from "../data_types/validation.js";

interface LooseObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = getObjectsDb();
    const cursor = db.collection("Test_objects").find();
    const data = [];

    for await (const item of cursor) {
      data.push(item);
    }

    if (data) {
      return res.json(data);
    }

    res.status(404).send("Not found");
  } catch (error) {
    next(error);
  }
});

router.get("/search", async (req, res, next) => {
  try {
    const query = req.query;
    const queryObject = {} as LooseObject;

    Object.keys(req.query).forEach((key) => {
      const value = query[key];
      if (value) {
        return (queryObject[key] = {
          $regex: new RegExp(query[key] as string, "i"),
        });
      }
    });

    const db = getObjectsDb();
    const cursor = db.collection("Test_objects").find(queryObject);
    const data = [];

    for await (const item of cursor) {
      data.push(item);
    }

    if (data) {
      return res.json(data);
    }

    res.status(404).send("Not found");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const db = getObjectsDb();
    const data = await db
      .collection("Test_objects")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (data) {
      return res.json(data);
    }

    res.status(404).send("Not found");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const validate = validateData(body);
    if (!validate.success) {
      return res.status(400).json(validate.error.issues);
    }

    body.dateAdded = Date.now();
    body.images = [];

    const db = getObjectsDb();
    const result = await db.collection("Test_objects").insertOne(body);

    if (!result.insertedId) {
      throw Error("Couldnt save object data");
    }

    body._id = result.insertedId;

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const db = getObjectsDb();
    const attempt = await db
      .collection("Test_objects")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (attempt.deletedCount === 1) {
      return res.status(204).send("Deleted");
    }

    res.status(404).send("Not found");
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const body = req.body;

    const validate = validateDataPartial(body);
    if (!validate.success) {
      return res.status(400).json(validate.error.issues);
    }

    const updateObject = { $set: body };
    const db = getObjectsDb();
    const attempt = await db
      .collection("Test_objects")
      .updateOne({ _id: new ObjectId(req.params.id) }, updateObject);

    if (attempt.matchedCount === 1) {
      return res.status(204).send("Updated");
    }

    res.status(404).send("Not found");
  } catch (error) {
    next(error);
  }
});

export default router;
