import express from "express";
import { getImagesDb, getObjectsDb } from "../db.js";
import { ObjectId } from "mongodb";
import { validateData, validateDataPartial } from "../data_types/validation.js";

interface RegexQueryObject {
  [key: string]: { $regex: RegExp };
}

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const db = getObjectsDb();
    const cursor = db.collection(req.headers.userFolder as string).find();
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
    const queryObject = {} as RegexQueryObject;

    Object.entries(req.query).forEach(([key, value]) => {
      if (value) {
        return (queryObject[key] = {
          $regex: new RegExp(value as string, "i"),
        });
      }
    });

    const db = getObjectsDb();
    const cursor = db
      .collection(req.headers.userFolder as string)
      .find(queryObject);
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
      .collection(req.headers.userFolder as string)
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

    const searchStrings: string[] = [];
    Object.values(body).forEach((value) => {
      searchStrings.push(value as string);
    });

    body.searchString = searchStrings.join("&");
    body.dateAdded = Date.now();
    body.images = [];

    const db = getObjectsDb();
    const result = await db
      .collection(req.headers.userFolder as string)
      .insertOne(body);

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
    const id = req.params.id;

    const db = getObjectsDb();
    const data = await db
      .collection(req.headers.userFolder as string)
      .findOne({ _id: new ObjectId(id) });

    if (!data) {
      return res.status(404).send("Not found");
    }

    if (data.images.length > 0) {
      const iDb = getImagesDb();
      const updateObject = { $set: { objectLink: "" } };
      for await (const image of data.images) {
        await iDb
          .collection(req.headers.userFolder as string)
          .updateOne({ _id: new ObjectId(image) }, updateObject);
      }
    }

    await db
      .collection(req.headers.userFolder as string)
      .deleteOne({ _id: new ObjectId(id) });

    res.status(204).send("Deleted");
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const id = req.params.id;

    const validate = validateDataPartial(body);
    if (!validate.success) {
      return res.status(400).json(validate.error.issues);
    }

    const db = getObjectsDb();
    const data = await db
      .collection(req.headers.userFolder as string)
      .findOne({ _id: new ObjectId(id) });

    if (!data) {
      res.status(404).send("Not found");
    }

    const combinedData = { ...data, ...body, searchStrings: null };
    const searchStrings: string[] = [];
    Object.values(combinedData).forEach((value) => {
      if (typeof value === "string") {
        searchStrings.push(value as string);
      }
    });

    body.searchString = searchStrings.join("&");

    const updateObject = { $set: body };
    await db
      .collection(req.headers.userFolder as string)
      .updateOne({ _id: new ObjectId(id) }, updateObject);

    res.status(204).send("Updated");
  } catch (error) {
    next(error);
  }
});

export default router;
