import z from "zod";
import * as dataTypes from "./object.js";
import * as miscTypes from "./misc.js";

export const ImageData = z
  .object({
    shared: dataTypes.BooleanData,
    userText: dataTypes.StringData,
    userGroup: dataTypes.StringData,
    objectLink: miscTypes.MongoId,
  })
  .strict();

export const ImageId = miscTypes.MongoId;

export const ImageIdArray = ImageId.array();
