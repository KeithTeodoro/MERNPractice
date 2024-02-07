const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

// get all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ data: ideas });
  } catch (err) {
    res.status(500).json({ success: false, error: "Something went wrong." });
  }
});

// add an idea
router.post("/", async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// get a single idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ success: true, data: idea });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Update idea
router.put("/:id", async (req, res) => {
  try {
    const updatedIdea = await Idea.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          text: req.body.text,
          tag: req.body.tag,
        },
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// delete idea
router.delete("/:id", async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
