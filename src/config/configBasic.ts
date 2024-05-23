import path from 'path';
require('dotenv').config({ path: path.join(__dirname, '.env') });
export const config = {
  MONGODB: {
    MONGOURI: process.env.MongoUri,
  },
  jwt: {
    jwtSecret: process.env.jwtSecret,
    saltRounds: process.env.saltRounds,
  },
  Redis:{
    HOST:process.env.redis_host,
    PORT:process.env.redis_port
  },
  Stripe:{
    secret_key:process.env.Stripe_Secret_key
  },
  Jwt_keys:{
    JWT_key:process.env.jwtSecret
  },
  verificationTokenSize: process.env.verificationTokenSize,
  investor_url: process.env.INVESTOR_URL,
  mailTrap: {
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_AUTH_USER,
      pass: process.env.MAILTRAP_AUTH_PASS,
    },
    fromEmail: process.env.MAILTRAP_FROM_EMAIL,
  },
};


