const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: {
                content: 'La commande help renvoie la liste de commande de Earth Chan',
                usage: 'h(elp) <commande>',
                exemples: ['help', 'help ping', 'h userinfo']
            },
            category: 'Misc',
            args: [{ id: 'command', type: 'commandAlias' }],
            typing: true,
        });
    }

    exec(message, args) {
        const prefix = this.handler.prefix;
        const command = args.command;

        if (!command) {
            let embed = new MessageEmbed()
                .setColor('#EFAC2F')
                .setTitle('Earth Chan va vous aidé !!!')
                .setAuthor("Vous avez besoin d'aide ?", this.client.user.displayAvatarURL())
                .setDescription('Voici la liste des commandes :\n**-----------**');

            const categories = this.handler.categories.values()
            for (const category of categories) {
                var name = ''
                name = `ф ${category.id}`;
                var value = ''
                for (const aliase of category) {
                    if (value != '') {
                        value += ', '
                    }
                    if (aliase != '') {
                        value += `\`${aliase[0]}\``;
                    }
                }
                if (value === undefined || value === null || value === '') {
                    value = '...'
                }
                if (category.id != 'Dev' || message.author.id === this.client.ownerID) {
                    embed.addField(name, value);
                }
            }

            embed
                .addField(
                    '-----------',
                    `**\`${prefix}help <command>\` pour des infos sur une commande spécifique.**\nExemples:\n\`${prefix}help ping\` | \`${prefix}help userinfo\``
                )
                .setTimestamp()
                .setFooter('Earth Chan vous dit à la prochaine', 'https://i.imgur.com/xOl5Quf.png');

            return message.channel.send({ embeds: [embed] });
        }
        return message.channel.send(stripIndents`
        \`\`\`makefile
        [Help: Command -> ${command.aliases[0]}] ${command.ownerOnly ? '/!\\ Admin Only /!\\' : ''}

        ${command.description.content}
        Utilisation: ${prefix}${command.description.usage}
        Exemples: ${prefix}${command.description.exemples.join(' | ${prefix}')}
        \`\`\`
        `);
    }
}

module.exports = HelpCommand;