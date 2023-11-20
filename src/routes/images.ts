import express from "express";
import { getImagesDb } from "../db";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
  const db = getImagesDb();
  const cursor = db.collection("Test_images").find();
  const data = [];
  for await (const item of cursor) {
    data.push(item);
  }
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const db = getImagesDb();
  const data = await db
    .collection("Test_images")
    .findOne({ _id: new ObjectId(req.params.id) });
  res.json(data);
});

router.post("/", (req, res) => {
  res.send("COOL POST");
});

router.delete("/:id", (req, res) => {
  res.send("COOL DELETE");
});

router.patch("/:id", (req, res) => {
  res.send("COOL UPDATE");
});

export default router;
