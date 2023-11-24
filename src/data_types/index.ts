import z from "zod";

const StringData = z.string();

const StringDataArray = z.string().array();

const BooleanData = z.boolean();

const BooleanDataArray = z.boolean().array();

const NumberData = z.number();

const NumberDataArray = z.number().array();

const DateData = z.date();

const DateDataArray = z.date().array();

const DiaryEvent = z
  .object({
    date: DateData,
    note: StringData,
  })
  .strict();

const DiaryDataArray = DiaryEvent.array();

const UserLogin = z
  .object({
    email: StringData,
    password: StringData,
  })
  .strict();

const UserData = z
  .object({
    email: StringData,
    password: StringData,
    objectCollection: StringData,
    imageCollection: StringData,
  })
  .strict();

export {
  StringData,
  StringDataArray,
  BooleanData,
  BooleanDataArray,
  NumberData,
  NumberDataArray,
  DateData,
  DateDataArray,
  DiaryEvent,
  DiaryDataArray,
  UserLogin,
  UserData,
};
