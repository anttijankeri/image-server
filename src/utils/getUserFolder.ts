import { createHash } from "crypto";

const getUserFolder = (authId: string) => {
  const salt = process.env.USER_SALT;
  const hashedUserId = createHash("sha256")
    .update(authId + salt)
    .digest("hex");

  return hashedUserId;
};

export default getUserFolder;
