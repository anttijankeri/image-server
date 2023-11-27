import path from "path";
import { readFile } from "fs/promises";

const FILE_SERVER_IMAGE_PATH = "http://localhost:4567/images/";

export const fetchImage = async (filePath: string) => {
  try {
    return {
      result: await fetch(path.resolve(FILE_SERVER_IMAGE_PATH, filePath)),
    };
  } catch (error) {
    return { error };
  }
};

export const postImage = async (filePath: string) => {
  try {
    const file = await readFile(filePath, { encoding: "binary" });
    return {
      postResponse: await fetch(FILE_SERVER_IMAGE_PATH, {
        method: "POST",
        body: file,
      }).then((data) => {
        if (data.status !== 200) {
          throw new Error(data.statusText);
        }
        return data.json();
      }),
    };
  } catch (error) {
    return { error };
  }
};

export const deleteImage = async (filePath: string) => {
  try {
    return {
      result: await fetch(path.resolve(FILE_SERVER_IMAGE_PATH, filePath), {
        method: "DELETE",
      }),
    };
  } catch (error) {
    return { error };
  }
};
