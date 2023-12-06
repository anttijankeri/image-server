import { readFile } from "fs/promises";

const fileServerUrl = process.env.FILE_SERVER_URL as string;

export const fetchImage = async ({
  userFolder,
  fileName,
  fileMime,
}: {
  userFolder: string;
  fileName: string;
  fileMime: string;
}) => {
  try {
    return {
      result: await fetch(fileServerUrl, {
        method: "GET",
        headers: { userFolder, fileName, fileMime },
      }).then((data) => {
        if (!data.ok) {
          throw new Error(data.statusText);
        }
        return data;
      }),
    };
  } catch (error) {
    return { error };
  }
};

export const deleteImage = async (userFolder: string, fileName: string) => {
  try {
    return {
      result: await fetch(fileServerUrl, {
        method: "DELETE",
        headers: { userFolder, fileName },
      }).then((data) => {
        if (!data.ok) {
          throw new Error(data.statusText);
        }
        return data.json();
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
      postResponse: await fetch(fileServerUrl, {
        method: "POST",
        body: form,
      }).then((data) => {
        if (!data.ok) {
          throw new Error(data.statusText);
        }
        return data.json();
      }),
    };
  } catch (error) {
    return { error };
  }
};
