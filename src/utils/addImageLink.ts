import { Db, ObjectId } from "mongodb";

const addImageLink = async (db: Db, objectId: string, imageId: string) => {
  const data = await db
    .collection("Test_objects")
    .findOne({ _id: new ObjectId(objectId) });

  if (!data) {
    return "";
  }

  data.images.push(imageId);

  const updateObject = { $set: { images: data.images } };
  const attempt = await db
    .collection("Test_objects")
    .updateOne({ _id: new ObjectId(objectId) }, updateObject);

  if (attempt.matchedCount === 0) {
    return "";
  }

  return objectId;
};

export default addImageLink;
