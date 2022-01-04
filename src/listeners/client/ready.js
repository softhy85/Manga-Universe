const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        this.client.user.setPresence({
            activities: [
                {
                    name: 'Watching the universe <3',
                    type: 'WATCHING'
                }
            ],
            status: 'dnd'
        });
        const message = 'Earth Chan a rejoint la bataille !'
        const guilds = await this.client.guildSettings.getAll();

        for (var key in guilds) {
            if (guilds[key].idChannelCommands) {
                const channel = this.client.channels.cache.get(guilds[key].idChannelCommands);
                channel.send(message);
            }
        }

        const nonBotUsers = this.client.users.cache.filter(user => !user.bot);

        const channelTextuel = this.client.channels.cache.filter(channel => channel.type == 'GUILD_TEXT');

        const channelVocal = this.client.channels.cache.filter(channel => channel.type == 'GUILD_VOICE');

        console.log(message + `\nEarth Chan regarde ${this.client.guilds.cache.size} serveurs,\n${nonBotUsers.size} utilisateurs (bot non-inclu),\n${channelTextuel.size} salons textuels, ${channelVocal.size} salons vocals.`);
    }
}

module.exports = ReadyListener;