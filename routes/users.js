const express = require("express");
const router = express.Router();
const { User } = require("../db");

/*
    Set routes
*/
router.get("/", async (req, res, next) => {
  try {
    if (req.user.role === "engineer") {
      const data = await User.findAll({
        attributes: ["id", "name", "username", "role"],
      });
      res.json({ message: "Successfully fetched all tickets", data });
    } else {
      res.json({ error: "Not authorised to get users" });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (req.user.role === "engineer") {
      const data = await User.destroy({ where: { id: req.params.id } });
      res.json({ message: "Successfully deleted user", data });
    } else {
      res.json({ error: "Not authorised to delete users" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
