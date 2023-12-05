import * as dataTypes from "./index.js";
import * as imageTypes from "./images.js";
import { ConfigObject } from "../config.js";
import z, { ZodString } from "zod";

export const DataObjectSchema = z.object({
  ...ConfigObject,
  shared: dataTypes.BooleanData,
});

export const DataObjectSchemaStrict = DataObjectSchema.strict();

export const DataObjectSchemaPartial = DataObjectSchemaStrict.partial();

export type DataObject = z.infer<typeof DataObjectSchemaStrict>;

export const ImageDataSchema = imageTypes.ImageData;

export const ImageDataSchemaPartial = ImageDataSchema.partial();

export type ImageObject = z.infer<typeof ImageDataSchema>;

export const UserObjectSchema = dataTypes.UserLogin;

export type UserObject = z.infer<typeof UserObjectSchema>;

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

export const validateUser = (user: UserObject) => {
  return UserObjectSchema.safeParse(user);
};

export const isStringValue = (key: string) => {
  return ConfigObject[key as keyof typeof ConfigObject] instanceof ZodString;
};
