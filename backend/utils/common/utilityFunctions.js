const uuid = require('uuid');

const genUUID = () => {
    return uuid.v4().toUpperCase();
}

const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    genUUID,
    getRandomNumber
};