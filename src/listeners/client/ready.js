const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        const message = 'Earth Chan a rejoint la bataille !'
        console.log(message);
        const channel = this.client.channels.cache.get('927282461535260672');

        channel.send(message);
    }
}

module.exports = ReadyListener;