const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');
const nodemailer = require("nodemailer");



const UserService = require('./user.service');
const service = new UserService();

class AuthServices{

  async getUser(  email, password) {
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }

  async sendEmail(email) {
    const user = await service.findByEmail(email);
    if(!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
          user: config.emailSender,
          pass: config.emailPassword,
      }
    });
    await transporter.sendMail({
      from: config.emailSender, // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hi Cinlo", // plain text body
      html: "<b>Hi Cinlo</b>", // html body
    });
    return { message: 'mail sent' }
  }
}

module.exports = AuthServices;
