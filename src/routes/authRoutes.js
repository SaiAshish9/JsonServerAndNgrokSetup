const express = require("express");
const User = require("../models/User");
const router = express.Router(),
  jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({
      email,
      password,
    });
    await user.save();
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "SECRET"
    );
    res.json({ token });
  } catch (e) {
    res.status(422).json(e.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      error: "Must provide email and password",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).send({ error: "Email not found" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "SECRET");
    res.send({ token });
  } catch (e) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

module.exports = router;
