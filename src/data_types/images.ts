import z from "zod";
import * as dataTypes from "./index";

const MAX_FILE_SIZE = 50000000; // Change as necessary to accomodate your max file size for images
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ImageFile = z
  .any()
  .refine((file) => file?.length === 0, "Image is required.")
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 50MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Only .jpg, .jpeg, .png and .webp formats are supported."
  );

const ImageData = z
  .object({
    // will also have filePath: StringData from server
    // imageFile: ImageFile,
    shared: dataTypes.BooleanData,
    userText: dataTypes.StringData,
    userGroup: dataTypes.StringData,
    objectLink: dataTypes.MongoId,
    dateAdded: dataTypes.DateData,
  })
  .strict();

const ImageId = dataTypes.MongoId;

const ImageIdArray = ImageId.array();

export { ImageFile, ImageData, ImageId, ImageIdArray };
