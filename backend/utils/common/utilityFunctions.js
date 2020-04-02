const uuid = require('uuid');

const genUUID = () => {
    return uuid.v4().toUpperCase();
}

module.exports = {
    genUUID
};