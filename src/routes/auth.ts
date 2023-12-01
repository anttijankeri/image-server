import express from "express";
import { validateUser } from "../data_types/validation.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase.js";

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
    const userCredential = await createUserWithEmailAndPassword(
      firebaseAuth,
      body.email,
      body.password
    );

    const user = userCredential.user;

    res.json(user);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
});

export default router;
