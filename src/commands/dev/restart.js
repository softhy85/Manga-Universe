const { Command } = require('discord-akairo');

class RestartCommand extends Command {
    constructor() {
        super('restart', {
            aliases: ['restart'],
            description: {
                content: "La commande restart redémare Earth Chan",
                usage: 'restart',
                exemples: ['restart']
            },
            category: 'Dev',
            ownerOnly: true
        });
    }

    exec(message) {
        require('child_process').execSync('pm2 restart 0');
    }
}

module.exports = RestartCommand;