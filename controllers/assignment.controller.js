const assignmnetService = require("../services/assignment1.service");

module.exports = {
  assignment1: async (req, res, next) => {
    try {
      const data = await assignmnetService.assignment1();
      res.status(201).json({ data: { data }, error: false });
    } catch (error) {
      next(error);
    }
  },
  assignment2: async (req, res, next) => {
    try {
      const data = await assignmnetService.assignment2();
      res.status(201).json({ data: { data }, error: false });
    } catch (error) {
      next(error);
    }
  },
};
