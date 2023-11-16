import express from "express";
import { SHARING_ALLOWED } from "../config";

const router = express.Router();

const isAllowed = () => {
  return SHARING_ALLOWED;
};

router.get("/objects/:id", (req, res) => {
  if (!isAllowed()) {
    res.status(403).send();
  }

  res.send("COOL OBJECT");
});

router.get("/images/:id", (req, res) => {
  if (!isAllowed()) {
    res.status(403).send();
  }

  res.send("COOL IMAGE");
});

export default router;
