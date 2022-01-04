const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

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

    async exec(message) {
        const sentMessage = await message.channel.send('Pong!');
        const timeStamp = message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp;
        const botLatency = `${'```'}\n ${Math.round(sentMessage.createdTimestamp - timeStamp)} ms ${'```'}`;
        const apiLatency = `${'```'}\n ${Math.round(message.client.ws.ping)} ms ${'```'}`;

        const embed = new MessageEmbed()
            .setColor('#782FEF')
            .setTitle('Pong!  🏓')
            .addField('Latence de Earth Chan', botLatency, true)
            .addField("latence de l'Api", apiLatency, true)
            .setTimestamp()
            .setFooter('Earth Chan vous dit à la prochaine', 'https://i.imgur.com/xOl5Quf.png');

        return await sentMessage.edit({ content: null, embeds: [embed] });
    }
}

module.exports = PingCommand;