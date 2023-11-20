import * as dataTypes from ".";
import { ConfigObjectSchema } from "../config";
import z from "zod";

export const DataObjectSchema = ConfigObjectSchema.extend({
  shared: dataTypes.BooleanData,
  dateAdded: dataTypes.DateData,
});

export const DataObjectSchemaStrict = DataObjectSchema.strict();

export type DataObject = z.infer<typeof DataObjectSchemaStrict>;

export const ImageDataSchema = dataTypes.ImageData;

export type ImageObject = z.infer<typeof ImageDataSchema>;

export const validateData = (data: DataObject) => {
  return DataObjectSchema.safeParse(data).success;
};

export const validateDataStrict = (data: DataObject) => {
  return DataObjectSchemaStrict.safeParse(data).success;
};

export const validateImage = (image: ImageObject) => {
  return ImageDataSchema.safeParse(image).success;
};
