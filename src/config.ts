import * as dataTypes from "./data_types/object.js";

export const REGISTRATION_ALLOWED = true; // Use to disable registration after creating your own username for fully private apps
export const SHARING_ALLOWED = true; // Use to disable sharing of images for unauthenticated users

export const ConfigObject = {
  // ADD YOUR OWN DATA TYPES HERE
  // USE TYPES IN DATA_TYPES/OBJECT.TS
  // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVvV
  // -----------------------------------

  genusName: dataTypes.StringData,
  speciesName: dataTypes.StringData,
  commonName: dataTypes.StringData,
  identifyingInfo: dataTypes.StringData,
  placeOfOrigin: dataTypes.StringData,
  acquiredFrom: dataTypes.StringData,
  growingNote: dataTypes.StringData,
  freeNote: dataTypes.StringData,
  publication: dataTypes.StringData,
  purchasePrice: dataTypes.StringData,
  salePrice: dataTypes.StringData,
  collectionTag: dataTypes.StringData,

  forSale: dataTypes.BooleanData,

  dateAcquired: dataTypes.DateData,
  dateFirstFlower: dataTypes.DateData,
  dateLastFlower: dataTypes.DateData,
  dateRemoved: dataTypes.DateData,

  events: dataTypes.DiaryDataArray,

  // -----------------------------------
  // ^^^^ DATATYPES ABOVE THIS LINE ^^^^
  // IMAGES ARE ADDED BY DEFAULT
};
