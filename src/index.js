const GotoClient = require('./structures/GotoClient');
const { TOKEN } = require('./util/config')

let client = new GotoClient(
    {
        prefix: '!'
    }
);

client.login(TOKEN);