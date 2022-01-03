const { Listener } = require('discord-akairo');
const { CMD_CHANNEL } = require('./../../util/config.js');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        const message = 'Earth Chan a rejoint la bataille !'
        const channel = this.client.channels.cache.get(CMD_CHANNEL);

        console.log(message);
        channel.send(message);
    }
}

module.exports = ReadyListener;