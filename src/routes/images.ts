import express from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import { fileTypeFromFile } from "file-type";
import { getImagesDb } from "../db.js";
import { ObjectId } from "mongodb";
import {
  validateImage,
  validateImagePartial,
} from "../data_types/validation.js";
import { fetchImage, postImage, deleteImage } from "../fileServer/api.js";
import addImageLink from "../utils/addImageLink.js";
import removeImageLink from "../utils/removeImageLink.js";

const router = express.Router();

router.use(
  fileUpload({
    limits: {
      fileSize: 20000000,
    },
    abortOnLimit: true,
    useTempFiles: true,
    tempFileDir: "../../temp/",
    safeFileNames: true,
    preserveExtension: 4,
    parseNested: true,
  })
);

router.get("/", async (req, res, next) => {
  try {
    const db = getImagesDb();
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

router.get("/:id", async (req, res, next) => {
  try {
    const db = getImagesDb();
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

router.get("/file/:id", async (req, res, next) => {
  try {
    const userFolder = req.headers.userFolder as string;

    const db = getImagesDb();

    const data = await db
      .collection(userFolder)
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!data) {
      return res.status(404).send("Not found");
    }

    const fileName = data.fileName;

    const file = await fetchImage(userFolder, fileName);
    if (file.error) {
      return res.status(404).send("Not found");
    }

    const result = file.result as Response;
    console.log(result);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const validate = validateImage(body);
    if (!validate.success) {
      return res.status(400).json(validate.error.issues);
    }

    body.dateAdded = Date.now();

    const { objectLink } = body;
    body.objectLink = "";

    const file = req.files?.image as UploadedFile;
    if (!file) {
      return res.status(400).send("Image file missing");
    }

    const type = await fileTypeFromFile(file.tempFilePath);
    let fileFormat;
    switch (type?.mime as string) {
      case "image/jpeg":
      case "image/bmp":
      case "image/webp":
      case "image/png":
        fileFormat = "." + type!.ext;
        break;

      default:
        return res.status(400).send("Only images (png/bmp/webp/jpg) allowed");
    }

    const userFolder = req.headers.userFolder as string;

    const { error, postResponse } = await postImage(
      file.tempFilePath,
      fileFormat,
      userFolder
    );

    if (error) {
      throw Error("Couldnt save image file: " + error);
    }

    body.fileName = postResponse.fileName;

    const db = getImagesDb();
    const imageAttempt = await db.collection(userFolder).insertOne(body);

    if (!imageAttempt.insertedId) {
      throw Error("Couldnt save image data");
    }

    body._id = imageAttempt.insertedId;

    if (objectLink !== "") {
      const addedObjectLink = await addImageLink(
        objectLink,
        imageAttempt.insertedId.toString(),
        userFolder
      );

      const updateObject = { $set: { objectLink: addedObjectLink } };
      const linkToObjectAttempt = await db
        .collection(userFolder)
        .updateOne(
          { _id: new ObjectId(imageAttempt.insertedId) },
          updateObject
        );

      if (linkToObjectAttempt.matchedCount === 1) {
        body.objectLink = addedObjectLink;
      }
    }

    res.status(201).json(body);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const userFolder = req.headers.userFolder as string;
    const id = req.params.id;

    const db = getImagesDb();

    const data = await db
      .collection(userFolder)
      .findOne({ _id: new ObjectId(id) });

    if (!data) {
      return res.status(404).send("Not found");
    }

    const fileName = data.fileName;

    const attempt = await deleteImage(userFolder, fileName);
    if (attempt.error) {
      return res.status(404).send("Not found");
    }

    const objectLink = data.objectLink;

    if (objectLink !== "") {
      removeImageLink(objectLink, id, userFolder);
    }

    await db.collection(userFolder).deleteOne({ _id: new ObjectId(id) });

    res.status(204).send("Deleted");
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const validate = validateImagePartial(body);
    if (!validate.success) {
      return res.status(400).json(validate.error.issues);
    }

    const userFolder = req.headers.userFolder as string;
    const id = req.params.id;

    const db = getImagesDb();
    const data = await db
      .collection(userFolder)
      .findOne({ _id: new ObjectId(id) });

    if (!data) {
      return res.status(404).send("Not found");
    }

    if (data.objectLink !== body.objectLink) {
      if (data.objectLink !== "") {
        removeImageLink(data.objectLink, id, userFolder);
      }

      if (body.objectLink !== "") {
        addImageLink(body.objectLink, id, userFolder);
      }
    }

    const updateObject = { $set: body };
    await db
      .collection(userFolder)
      .updateOne({ _id: new ObjectId(id) }, updateObject);

    res.status(204).send("Updated");
  } catch (error) {
    next(error);
  }
});

export default router;
