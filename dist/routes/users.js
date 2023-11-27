import express from "express";
const router = express.Router();
router.get("/:id", (req, res) => {
    res.send("COOL ID");
});
router.post("/", (req, res) => {
    res.send("COOL POST");
});
router.delete("/:id", (req, res) => {
    res.send("COOL DELETE");
});
router.patch("/:id", (req, res) => {
    res.send("COOL UPDATE");
});
export default router;
