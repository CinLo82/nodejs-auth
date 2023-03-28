const express = require('express');
const auth = require('../utils/auth')

const router = express.Router();

router.post('/login',
  auth.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
