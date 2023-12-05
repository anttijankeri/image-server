import { readFile } from "fs/promises";

const FILE_SERVER_IMAGE_PATH = "http://localhost:4567/api/v1/images";

export const fetchImage = async (userFolder: string, fileName: string) => {
  try {
    return {
      result: await fetch(FILE_SERVER_IMAGE_PATH, {
        headers: { userFolder, fileName },
      }),
    };
  } catch (error) {
    return { error };
  }
};

export const deleteImage = async (userFolder: string, fileName: string) => {
  try {
    return {
      result: await fetch(FILE_SERVER_IMAGE_PATH, {
        method: "DELETE",
        headers: { userFolder, fileName },
      }),
    };
  } catch (error) {
    return { error };
  }
};

export const postImage = async (
  tempFile: string,
  format: string,
  userId: string
) => {
  try {
    const file = await readFile(tempFile);

    const form = new FormData();
    form.append("file", new Blob([file]));
    form.append("format", format);
    form.append("folder", userId);

    return {
      postResponse: await fetch(FILE_SERVER_IMAGE_PATH, {
        method: "POST",
        body: form,
      }).then((data) => {
        if (data.status !== 201) {
          throw new Error(data.statusText);
        }
        return data.json();
      }),
    };
  } catch (error) {
    return { error };
  }
};
