import z from "zod";

export const StringData = z.string();

export const StringDataArray = StringData.array();

export const BooleanData = z.enum(["true", ""]);

export const BooleanDataArray = BooleanData.array();

export const NumberData = z.number();

export const NumberDataArray = NumberData.array();

export const DateData = z.number();

export const DateDataArray = DateData.array();

export const DiaryEvent = z
  .object({
    date: DateData,
    note: StringData,
  })
  .strict();

export const DiaryDataArray = DiaryEvent.array();
