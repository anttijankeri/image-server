import { ObjectId } from "mongodb";
import { getObjectsDb } from "../db.js";

const removeImageLink = async (
  objectId: string,
  imageId: string,
  userFolder: string
) => {
  const db = getObjectsDb();
  const data = await db
    .collection(userFolder)
    .findOne({ _id: new ObjectId(objectId) });

  if (!data) {
    return false;
  }

  const index = (data.images as string[]).findIndex(
    (image) => image === imageId
  );
  data.images.splice(index, 1);

  const updateObject = { $set: { images: data.images } };
  const attempt = await db
    .collection(userFolder)
    .updateOne({ _id: new ObjectId(objectId) }, updateObject);

  if (attempt.matchedCount === 0) {
    return false;
  }

  return true;
};

export default removeImageLink;
