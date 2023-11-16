import express from "express";

const router = express.Router();

router.get("/objects/:id", (req, res) => {
  res.send("COOL OBJECT");
});

router.get("/images/:id", (req, res) => {
  res.send("COOL IMAGE");
});

export default router;
