import { Db, MongoClient, ServerApiVersion } from "mongodb";

let usersDb: Db;
let objectsDb: Db;
let imagesDb: Db;
let client;

export const connectToDbs = async () => {
  const uri = process.env.URI;
  console.log("Connecting to URI: " + uri);
  client = new MongoClient(uri as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  usersDb = client.db("Users");
  objectsDb = client.db("Objects");
  imagesDb = client.db("Images");
};

export const getUsersDb = () => {
  return usersDb;
};

export const getObjectsDb = () => {
  return objectsDb;
};

export const getImagesDb = () => {
  return imagesDb;
};
