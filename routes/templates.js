const express = require("express");
const router = express.Router();
const Template = require("../models/Template");
const defaultTemplates = require("../seed/defaultTemplates");

// GET /api/templates — list everything, seeding starter templates on first run
router.get("/", async (req, res) => {
  try {
    const count = await Template.countDocuments();
    if (count === 0) {
      await Template.insertMany(defaultTemplates);
    }
    const templates = await Template.find().sort({ createdAt: -1 });
    res.json(templates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/templates — create one
router.post("/", async (req, res) => {
  try {
    const { title, category, time, space, tags, code, notes } = req.body;
    if (!title || !code) {
      return res.status(400).json({ error: "title and code are required" });
    }
    const created = await Template.create({ title, category, time, space, tags, code, notes });
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/templates/:id — update one
router.put("/:id", async (req, res) => {
  try {
    const { title, category, time, space, tags, code, notes } = req.body;
    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { title, category, time, space, tags, code, notes },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Template not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/templates/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Template not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/templates/import — bulk import from a JSON export
router.post("/import", async (req, res) => {
  try {
    const items = req.body;
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "Expected an array of templates" });
    }
    const valid = items
      .filter((i) => i && i.title && i.code)
      .map((i) => ({
        title: String(i.title),
        category: String(i.category || "Misc"),
        time: String(i.time || ""),
        space: String(i.space || ""),
        tags: Array.isArray(i.tags) ? i.tags.map(String) : [],
        code: String(i.code),
        notes: String(i.notes || "")
      }));
    const inserted = await Template.insertMany(valid);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
