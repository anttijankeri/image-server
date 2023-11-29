import express from "express";
import { validateUser } from "../data_types/validation.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const body = req.body;

  const validate = validateUser(body);
  if (!validate.success) {
    return res.status(400).json(validate.error);
  }

  //   .collection("User_list")
  //   .findOne({ email: body.email });
  // if (data) {
  //   const hash = hashPassword(body.password);
  //   return res.json(data);
  // }
});

router.post("/signup", async (req, res) => {
  res.send("YES");
});

export default router;
