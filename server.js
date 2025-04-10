const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/db");
const profileRoutes = require("./routes/profileRoutes");
const UserProfile = require("./models/profile");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5001;

// Connect to DB, then sync models and start server
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connection established successfully.");

    await sequelize.sync({ alter: true }); // keeps DB in sync with model
    console.log("✅ Models synced to PostgreSQL.");

    app.listen(PORT, () => {
      console.log(`🚀 Profile Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect or sync with DB:", err);
  }
})();
