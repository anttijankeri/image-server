import express from "express";
const router = express.Router();
router.get("/", (req, res) => {
    res.send("COOL GET");
});
router.get("/search", (req, res) => {
    res.send("COOL SEARCH");
});
export default router;
