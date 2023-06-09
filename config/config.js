require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpSender: process.env.SMTP_SENDER,
  smtpPassword: process.env.SMTP_PASSWORD,
  host: process.env.HOST,

}

module.exports = { config };
