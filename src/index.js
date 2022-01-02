const GotoClient = require('./structures/GotoClient');
const { TOKEN } = require('./util/config')

if (TOKEN != '') {
    let client = new GotoClient(
        {
            prefix: '!'
        }
    );

    client.login(TOKEN);
} else {
    console.log('Token not set');
}