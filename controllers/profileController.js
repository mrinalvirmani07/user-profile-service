const Profile = require("../models/profile");

// GET /me
exports.getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { user_id: req.user.id } });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /
exports.createProfile = async (req, res) => {
  const { name, bio, profile_picture, location, website } = req.body;

  try {
    const existing = await Profile.findOne({ where: { user_id: req.user.id } });
    if (existing) return res.status(400).json({ message: "Profile already exists" });

    const profile = await Profile.create({
      user_id: req.user.id,
      name,
      bio,
      profile_picture,
      location,
      website,
    });

    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /
exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ where: { user_id: req.user.id } });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    await profile.update(req.body);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
