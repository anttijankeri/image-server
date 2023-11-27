import z from "zod";
import * as dataTypes from "./index";

const ImageData = z
  .object({
    // will also have filePath: StringData from server
    shared: dataTypes.BooleanData,
    userText: dataTypes.StringData,
    userGroup: dataTypes.StringData,
    objectLink: dataTypes.MongoId,
    dateAdded: dataTypes.DateData,
  })
  .strict();

const ImageId = dataTypes.MongoId;

const ImageIdArray = ImageId.array();

export { ImageData, ImageId, ImageIdArray };
