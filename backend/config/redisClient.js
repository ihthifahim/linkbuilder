const Redis = require('ioredis');


const redisCon = new Redis(`${process.env.REDIS_CON}`);


module.exports = {redisCon}