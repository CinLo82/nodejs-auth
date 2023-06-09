const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');

const router = express.Router();
const service = new OrderService();

router.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/my-orders',
  passport.authenticate('jwt', {session: false}),
  async (req, res, next) => {
    const data = { id: req.user.sub };
    try {
      res.status(201).json(await service.createFromProfile(data));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
