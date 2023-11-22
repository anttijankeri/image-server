import path from "path";

const FILE_SERVER_IMAGE_PATH = "http://localhost:3000/images/";

export const fetchImage = async (filePath: string) => {
  try {
    return {
      result: await fetch(path.resolve(FILE_SERVER_IMAGE_PATH, filePath)),
    };
  } catch (error) {
    return { error };
  }
};

export const postImage = async (image: string) => {
  try {
    return {
      filePath: await fetch(FILE_SERVER_IMAGE_PATH, {
        method: "POST",
        body: image,
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
