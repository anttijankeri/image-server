import z from "zod";

export const MongoId = z.string().regex(/^([\da-f]{24}|)$/);
