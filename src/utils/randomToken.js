const crypto = require('crypto');

const randomCrypto = () => crypto.randomBytes(8).toString('hex');

module.exports = randomCrypto;