const Capsule = require("../models/capsule");

async function createCapsule(req, res) {
  try {
    const { title, message, recipients, sendAt } = req.body;

    if (!title || !message || !recipients || !sendAt) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const sendAtDate = new Date(sendAt);
    if (sendAtDate <= new Date()) {
      return res.status(400).json({ error: "sendAt must be a future date." });
    }

    const capsule = await Capsule.create({
      title,
      message,
      recipients,
      sendAt: sendAtDate
    });

    res.status(201).json({ message: "Capsule saved.", capsule });

  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ error: "Server error." });
  }
}

async function getCapsule(req, res) {
  try {
    const capsule = await Capsule.findById(req.params.id);
    if (!capsule) return res.status(404).json({ error: "Not found." });
    res.json(capsule);
  } catch (err) {
    res.status(500).json({ error: "Error fetching capsule." });
  }
}

async function listCapsules(req, res) {
  try {
    const capsules = await Capsule.find().sort({ createdAt: -1 });
    res.json(capsules);
  } catch (err) {
    res.status(500).json({ error: "Error listing capsules." });
  }
}

module.exports = {
  createCapsule,
  getCapsule,
  listCapsules
};
