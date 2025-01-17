//
//
//
// amra server .ts a kano mongoose import korbo.karon application
// jotodoroner connection seta server sthe hok ba mongodb sathe hok, sob server.ts a korbo

// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
//niche mongoose.connect a error hote pare tai try-catch use korbo

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();
