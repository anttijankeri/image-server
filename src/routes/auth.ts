import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import getUserFolder from "../utils/getUserFolder.js";

const router = express.Router();

const checkJwt = auth({
  audience: process.env.AUTH0_APP + "/api/v2/",
  issuerBaseURL: process.env.AUTH0_APP,
});

router.use(checkJwt, (req, res, next) => {
  if (!req.auth?.payload.sub) {
    return res.status(401).send("Invalid authorization");
  }

  req.headers.userFolder = getUserFolder(req.auth.payload.sub);

  next();
});

export default router;
