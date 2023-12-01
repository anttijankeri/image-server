import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.send("COOL GET");
  } catch (error) {
    next(error);
  }
});

router.get("/search", (req, res, next) => {
  try {
    res.send("COOL SEARCH");
  } catch (error) {
    next(error);
  }
});

export default router;
