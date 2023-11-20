import express from "express";
import { getImagesDb } from "../db";
import { ObjectId } from "mongodb";
import { validateImage, validateImagePartial } from "../data_types/validation";

const router = express.Router();

router.get("/", async (req, res) => {
  const db = getImagesDb();
  const cursor = db.collection("Test_images").find();
  const data = [];

  for await (const item of cursor) {
    data.push(item);
  }

  if (data) {
    return res.json(data);
  }

  res.status(404).send("Not found");
});

router.get("/:id", async (req, res) => {
  const db = getImagesDb();
  const data = await db
    .collection("Test_images")
    .findOne({ _id: new ObjectId(req.params.id) });

  if (data) {
    return res.json(data);
  }

  res.status(404).send("Not found");
});

router.post("/", async (req, res) => {
  const body = req.body;
  body.dateAdded = new Date();

  const validate = validateImage(body);
  if (!validate.success) {
    return res.status(400).json(validate.error);
  }

  const db = getImagesDb();
  await db.collection("Test_images").insertOne(body);
  res.status(201).json(body);
});

router.delete("/:id", async (req, res) => {
  const db = getImagesDb();
  const attempt = await db
    .collection("Test_images")
    .deleteOne({ _id: new ObjectId(req.params.id) });

  if (attempt.deletedCount === 1) {
    return res.status(204).send("Deleted");
  }

  res.status(404).send("Not found");
});

router.patch("/:id", async (req, res) => {
  const body = req.body;
  const validate = validateImagePartial(body);
  if (!validate.success) {
    return res.status(400).json(validate.error);
  }

  const updateObject = { $set: body };
  const db = getImagesDb();
  const attempt = await db
    .collection("Test_images")
    .updateOne({ _id: new ObjectId(req.params.id) }, updateObject);

  if (attempt.matchedCount === 1) {
    return res.status(204).send("Updated");
  }

  res.status(404).send("Not found");
});

export default router;
