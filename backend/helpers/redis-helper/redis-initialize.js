const redis = require('redis');

const REDIS_SERVER = '139.59.0.106';
const REDIS_SERVER_PORT = 6379;

const redisClient = redis.createClient(REDIS_SERVER_PORT, REDIS_SERVER, {
    auth_pass: 'k~>?8s)EQ.435F=&y}[c`LznHCrM:.T>'
});

redisClient.on('connect', function () {
    console.log(`REDIS Client Connected to ${REDIS_SERVER}:${REDIS_SERVER_PORT}`);
});

redisClient.on('ready', function () {
    console.log(`REDIS Client is ready to use...`);
});

redisClient.on('error', function (error) {
    console.log('ERROR from REDIS Client... ', error);
});

redisClient.on('warning', function (error) {
    console.log('WARNING from REDIS Client... ', error);
});

redisClient.on('reconnecting', function () {
    console.error('REDIS is trying to reconnect...');
});

redisClient.on('end', function () {
    console.error('Connection with REDIS Client has been closed...');
});

module.exports = redisClient;
