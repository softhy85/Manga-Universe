const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            description: {
                content: 'La commande prefix change le prefix de Earth Chan',
                usage: 'prefix <newPrefix>',
                exemples: ['prefix', 'prefix !']
            },
            category: 'Admin',
            channel: 'guild',
            args: [
                { id: 'newPrefix', type: 'string', dafault: '!' }
            ]
        });
    }

    async exec(message, args) {
        if (message.guild) {
            var ok = await this.client.isUserAdmin(message.member);

            if (ok === true) {
                if (!args.newPrefix) {
                    return message.channel.send(`Prefix actuel -> \`${await this.handler.prefix(message)}\``);
                } else {
                    await this.client.guildSettings.update(message.guild, { prefix: args.newPrefix });
                    return message.channel.send(`Les prefix de Earth Chan est maintenant -> \`${args.newPrefix}\``);
                }
            }
        }
    }
}

module.exports = PrefixCommand;