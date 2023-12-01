import express from "express";
import { validateUser } from "../data_types/validation.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const body = req.body;

  const validate = validateUser(body);
  if (!validate.success) {
    return res.status(400).json(validate.error);
  }
});

router.post("/signup", async (req, res) => {
  const body = req.body;

  const validate = validateUser(body);
  if (!validate.success) {
    return res.status(400).json(validate.error);
  }

  try {
    res.json(body);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

export default router;
