import path from "path";

const FILE_SERVER_IMAGE_GET = "http://localhost:3000/images/";
const FILE_SERVER_IMAGE_POST = "http://localhost:3000/images/";

export const fetchImage = async (filePath: string) => {
  try {
    return {
      image: await fetch(path.resolve(FILE_SERVER_IMAGE_GET, filePath)),
    };
  } catch (error) {
    return { error };
  }
};

export const postImage = async (image: string) => {
  try {
    return {
      filePath: await fetch(FILE_SERVER_IMAGE_POST, {
        method: "POST",
        body: image,
      }),
    };
  } catch (error) {
    return { error };
  }
};
