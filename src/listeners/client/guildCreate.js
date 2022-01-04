const { Listener } = require('discord-akairo');
const { Permissions } = require('discord.js');
const { Guild } = require('../../structures/Models')

class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        const guildRoles = guild.roles.cache;
        var roles = [];

        for (guildRole in guildRoles) {
            const admin = guildRole.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
            roles.push({ id: guildRole.id, admin: admin });
        }

        await Guild.create({ id: guild.id, roles: roles }, err => {
            if (err)
                return console.log("Erreur lors de l'ajout du serveur !", err);
            else
                return console.log(`Nouveau serveur => ${guild.name} (${guild.id})`);
        })

    }
}

module.exports = GuildCreateListener;