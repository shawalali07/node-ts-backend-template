require('dotenv').config();
import { app } from './app';

const start = async () => {
  if (!process.env.jwtSecret) {
    throw new Error('JWT_KEY must be defined');
  }
  const port = process.env.PORT || 5000;
  try {
    app.listen(port, () => {
      console.log(`Listening on ${port}!!`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
