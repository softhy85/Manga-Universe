const GotoClient = require('./structures/GotoClient');

const token = 'OTI3MjI3MjkxNDc2NTcwMTQy.YdHJtQ.pVcCWHIP29pl7SmeQLHWDRRkurQ';

let client = new GotoClient(
    {
        prefix: '!'
    }
);

client.login(token);