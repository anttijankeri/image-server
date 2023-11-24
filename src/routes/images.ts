import express from "express";
import { getImagesDb } from "../db";
import { ObjectId } from "mongodb";
import { validateImage, validateImagePartial } from "../data_types/validation";
import { fetchImage, postImage, deleteImage } from "../fileServer/api";

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

router.get("/file/:id", async (req, res) => {
  const data = await fetchImage(req.params.id);
  if (data.error) {
    return res.status(404).send("Not found");
  }

  res.json((data.result as Response).body);
});

router.post("/", async (req, res) => {
  const body = req.body;

  const validate = validateImage(body);
  if (!validate.success) {
    return res.status(400).json(validate.error);
  }

  const postFile = await postImage(body.imageFile);

  if (postFile.error) {
    return res.status(500).send("Something blew up!");
  }

  body.filePath = postFile.filePath;
  delete body.imageFile;

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

router.delete("/file/:id", async (req, res) => {
  const attempt = await deleteImage(req.params.id);
  if (attempt.error) {
    return res.status(404).send("Not found");
  }

  res.json((attempt.result as Response).body);
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
