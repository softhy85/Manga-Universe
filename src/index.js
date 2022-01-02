const GotoClient = require('./structures/GotoClient');
const { TOKEN } = require('./util/config')

if (TOKEN === '' || TOKEN === null || TOKEN === undefined) {
    console.log('Token not set');
} else {
    let client = new GotoClient(
        {
            prefix: '!'
        }
    );

    client.login(TOKEN);
}
return (0);