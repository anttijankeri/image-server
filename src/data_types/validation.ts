import * as dataTypes from ".";
import { ConfigObjectSchema } from "../config";
import z from "zod";

export const DataObjectSchema = ConfigObjectSchema.extend({
  shared: dataTypes.BooleanData,
  dateAdded: dataTypes.DateData,
});

export const DataObjectSchemaStrict = DataObjectSchema.strict();

export const DataObjectSchemaPartial = DataObjectSchemaStrict.partial();

export type DataObject = z.infer<typeof DataObjectSchemaStrict>;

export const ImageDataSchema = dataTypes.ImageData;

export const ImageDataSchemaPartial = ImageDataSchema.partial();

export type ImageObject = z.infer<typeof ImageDataSchema>;

export const validateData = (data: DataObject) => {
  return DataObjectSchema.safeParse(data);
};

export const validateDataStrict = (data: DataObject) => {
  return DataObjectSchemaStrict.safeParse(data);
};

export const validateDataPartial = (data: DataObject) => {
  return DataObjectSchemaPartial.safeParse(data);
};

export const validateImage = (image: ImageObject) => {
  return ImageDataSchema.safeParse(image);
};

export const validateImagePartial = (image: ImageObject) => {
  return ImageDataSchemaPartial.safeParse(image);
};
