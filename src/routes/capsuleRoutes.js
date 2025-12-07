const express = require("express");
const router = express.Router();

const {
  createCapsule,
  getCapsule,
  listCapsules
} = require("../controllers/capsuleController");

router.post("/", createCapsule);
router.get("/", listCapsules);
router.get("/:id", getCapsule);

module.exports = router;
