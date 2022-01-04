const { Command } = require('discord-akairo');
const { Permissions } = require('discord.js');

class UpdateRoleCommand extends Command {
    constructor() {
        super('updateRole', {
            aliases: ['updateRole'],
            description: {
                content: 'La commande updateRole les roles du serveur de Earth Chan',
                usage: 'updateRole',
                exemples: ['updateRole']
            },
            category: 'Admin',
            channel: 'guild'
        });
    }

    async exec(message) {
        if (message.guild) {
            var ok = await this.client.isUserAdmin(message.member);
            var sendMessage = "Earth Chan a update les roles !";
            if (ok === true) {
                const guildRoles = message.guild.roles.cache;
                var roles = [];

                guildRoles.forEach((value, key) => {
                    const admin = value.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
                    roles.push({ id: value.id, name: value.name, admin: admin });
                });
                await this.client.guildSettings.update(message.guild, { roles: roles });
                console.log(sendMessage);
                message.channel.send(sendMessage);
            }
        }
    }
}

module.exports = UpdateRoleCommand;