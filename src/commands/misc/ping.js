const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: {
                content: 'La commande ping renvoie la latence de Earth Chan',
                usage: 'ping',
                exemples: ['ping']
            },
            category: 'Misc'
        });
    }

    exec(message) {
        return message.reply('Pong!');
    }
}

module.exports = PingCommand;