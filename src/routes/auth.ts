import express from "express";
import { validateUser } from "../data_types/validation.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const body = req.body;

    const validate = validateUser(body);
    if (!validate.success) {
      return res.status(400).json(validate.error.issues);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const body = req.body;

    const validate = validateUser(body);
    if (!validate.success) {
      return res.status(400).json(validate.error.issues);
    }

    res.json(body);
  } catch (error) {
    next(error);
  }
});

export default router;
