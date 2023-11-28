import z from "zod";

const StringData = z.string();

const StringDataArray = StringData.array();

const BooleanData = z.enum(["true", ""]);

const BooleanDataArray = BooleanData.array();

const NumberData = z.number();

const NumberDataArray = NumberData.array();

const DateData = z.number();

const DateDataArray = DateData.array();

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

const MongoId = z.string().regex(/^([\da-f]{24}|)$/);

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
  MongoId,
};
