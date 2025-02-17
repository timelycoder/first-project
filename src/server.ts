import app from './app';
import config from './app/config';

// const mongoose = require('mongoose');
import mongoose from 'mongoose';

async function main() {
  try {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
    await mongoose.connect(config.database_url as string);
  } catch (error) {
    console.log(error);
  }
}
main();
