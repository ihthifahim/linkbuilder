const {createClient} = require('redis');


const client = createClient ({
    url : "rediss://default:c2eea34c9302459386fa998e6355dc82@key-egret-49749.upstash.io:49749"
});

module.exports = client