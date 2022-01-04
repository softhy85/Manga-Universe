const { Listener } = require('discord-akairo');
const { Guild } = require('../../structures/Models')
const { ARR_CHANNEL } = require('./../../util/config.js');

class GuildCreateListener extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        await Guild.create({ id: guild.id }, err => {
            if (err)
                return console.log("Erreur lors de l'ajout du serveur !", err);
            else
                return console.log(`Nouveau serveur => ${guild.name} (${guild.id})`);
        })

    }
}

module.exports = GuildCreateListener;