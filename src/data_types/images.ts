import z from "zod";
import * as dataTypes from "./index.js";

const ImageData = z
  .object({
    shared: dataTypes.BooleanData,
    userText: dataTypes.StringData,
    userGroup: dataTypes.StringData,
    objectLink: dataTypes.MongoId,
  })
  .strict();

const ImageId = dataTypes.MongoId;

const ImageIdArray = ImageId.array();

export { ImageData, ImageId, ImageIdArray };
