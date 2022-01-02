const { Command } = require('discord-akairo');
const { MessageEmbed, Message } = require('discord.js');

class EmbedCommand extends Command {
    constructor() {
        super('embed', {
            aliases: ['embed']
        });
    }

    exec(message) {
        const embed = new MessageEmbed()
            .setColor('#dac147')
            .setDescription("Test")
            .addField('Titre Champ1', 'Valeur Champ1')
            .addField('Titre Champ2', 'Valeur Champ2')
            .addField('Titre Champ3', 'Valeur Champ3');

        return message.channel.send({ embeds: [embed] });
    }
}

module.exports = EmbedCommand;