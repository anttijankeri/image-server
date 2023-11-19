import { DataObjectSchema } from "../config";
import z from "zod";

export const DataObjectSchemaStrict = DataObjectSchema.strict();

export type DataObject = z.infer<typeof DataObjectSchemaStrict>;

export const validateData = (data: DataObject) => {
  return DataObjectSchema.safeParse(data).success;
};
