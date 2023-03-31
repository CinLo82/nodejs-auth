const express = require('express');
const passport = require('passport');

const AuthServices = require('./../services/auth.services');

const router = express.Router();
const service = new AuthServices();

router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
     res.json(service.signToken(user))
    } catch (error) {
      next(error);
    }
  }
);

router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
    const rta = await service.sendEmail(email)
    res.json(rta);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
