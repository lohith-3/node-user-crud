const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

const fs = require('fs');

const User = require('../../models/userModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((connection) => {
  console.log('DB connection successfull');
});

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

const importData = async () => {
  try {
    await User.create(users);
    console.log('DATA successfully loaded');
    process.exit();
  } catch (err) {
    console.log(`error in importData method: ${err.message}`);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('DATA deleted successfully');
    process.exit();
  } catch (err) {
    console.log(`error in deleteData method: ${err.message}`);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
} else {
  // EMPTY BLOCK
}

console.log(process.argv);

// 1) Make sure the dotenv file path is correct
// 2) node (js file path) --import/--delete
// node dev-data/data/import-dev-data.js --import
