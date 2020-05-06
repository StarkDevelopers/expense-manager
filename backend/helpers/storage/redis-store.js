const redisStore = require('../redis-helper/redis-initialize');

async function set(key, value) {
  return new Promise((resolve, reject) => {
    redisStore.set(key, value, error => {
      if (error) {
        return reject(error);
      }
      return resolve('OK');
    });
  });
}

async function get(key) {
  return new Promise((resolve, reject) => {
    redisStore.get(key, (error, data) => {
      if (error) {
        return reject(error);
      }
      return resolve(data);
    });
  });
}

module.exports = {
  get,
  set
};
