const express = require("express");
const router = express.Router();
const { Ticket } = require("../db");

/*
    Set routes
*/
router.get("/", async (req, res, next) => {
  try {
    if (req.user.role === "engineer") {
      const data = await Ticket.findAll();
      res.json({ message: "Successfully fetched all tickets", data });
    } else {
      const data = await Ticket.findAll({ where: { UserId: req.user.id } });
      res.json({ message: "Successfully fetched all tickets", data });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    if (req.user.role === "engineer") {
      const data = await Ticket.findByPk(req.params.id);
      res.json({ message: "Successfully fetched ticket", data });
    } else {
      const data = await Ticket.findOne({ where: { id: req.params.id, UserId: req.user.id } });
      res.json({ message: "Successfully fetched ticket", data });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await Ticket.create({
      title: req.body.title,
      description: req.body.description,
      urgent: req.body.urgent,
      UserId: req.user.id,
    });
    res.json({ message: "Successfully created ticket", data });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    if (req.user.role === "engineer") {
      const ticket = await Ticket.findByPk(req.params.id);
      const update = await ticket.update(req.body);
      res.json({
        message: "Successfully updated ticket",
        data: update,
      });
    } else {
      const ticket = await Ticket.findOne({ where: { id: req.params.id, UserId: req.user.id } });
      const update = await ticket.update(req.body);
      res.json({
        message: "Successfully updated ticket",
        data: update,
      });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    if (req.user.role === "engineer") {
      const ticket = await Ticket.destroy({ where: { id: req.params.id } });
      res.json({
        message: "Successfully deleted ticket",
        data,
      });
    } else {
      const data = await Ticket.destroy({ where: { id: req.params.id, UserId: req.user.id } });
      res.json({
        message: "Successfully deleted ticket",
        data,
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
