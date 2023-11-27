import * as dataTypes from "./index.js";
import * as imageTypes from "./images.js";
import { ConfigObjectSchema } from "../config.js";
export const DataObjectSchema = ConfigObjectSchema.extend({
    shared: dataTypes.BooleanData,
    dateAdded: dataTypes.DateData,
    images: imageTypes.ImageIdArray,
});
export const DataObjectSchemaStrict = DataObjectSchema.strict();
export const DataObjectSchemaPartial = DataObjectSchemaStrict.partial();
export const ImageDataSchema = imageTypes.ImageData;
export const ImageDataSchemaPartial = ImageDataSchema.partial();
export const UserObjectSchema = dataTypes.UserLogin;
export const validateData = (data) => {
    return DataObjectSchema.safeParse(data);
};
export const validateDataStrict = (data) => {
    return DataObjectSchemaStrict.safeParse(data);
};
export const validateDataPartial = (data) => {
    return DataObjectSchemaPartial.safeParse(data);
};
export const validateImage = (image) => {
    return ImageDataSchema.safeParse(image);
};
export const validateImagePartial = (image) => {
    return ImageDataSchemaPartial.safeParse(image);
};
export const validateUser = (user) => {
    return UserObjectSchema.safeParse(user);
};
