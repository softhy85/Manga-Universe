const { Command } = require('discord-akairo');

class UpdateChannelCommand extends Command {
    constructor() {
        super('updateChannel', {
            aliases: ['updateChannel'],
            description: {
                content: "La commande updateChannel modifie l'utilisation des channels.",
                usage: 'updateChannel <typeChannel> <idChannel>',
                exemples: ['updateChannel arrive 21346587561268', 'updateChannel partir 21346587561268', 'updateChannel commands 21346587561268']
            },
            category: 'Admin',
            channel: 'guild',
            args: [
                { id: 'typeChannel', type: 'string', required: true },
                { id: 'idChannel', type: 'string' }
            ]
        });
    }

    async exec(message, args) {
        if (message.guild) {
            var ok = await this.client.isUserAdmin(message.member);

            if (ok) {
                const typeChannel = args.typeChannel;
                const idChannel = args.idChannel;
                var sendMessage = `Earth Chan a update le channel de type : ${typeChannel} !`

                if ((typeChannel === 'arrive' || typeChannel === 'partir' || typeChannel === 'commands') &&
                    (idChannel === '' || this.client.channels.cache.get(idChannel))) {
                    if (typeChannel === 'arrive') {
                        await this.client.guildSettings.update(message.guild, { idChannelArrive: idChannel });
                    } else if (typeChannel === 'partir') {
                        await this.client.guildSettings.update(message.guild, { idChannelPartir: idChannel });
                    } else if (typeChannel === 'commands') {
                        await this.client.guildSettings.update(message.guild, { idChannelCommands: idChannel });
                    }
                    if (idChannel === '') {
                        sendMessage = `Earth Chan n'envera plus de message pour le type de channel : ${typeChannel} !`;
                    }
                } else {
                    sendMessage = "Earth Chan n'a pas réussit à configurer le channel !";
                }
                console.log(sendMessage);
                message.channel.send(sendMessage)
            }
        }
    }
}

module.exports = UpdateChannelCommand;