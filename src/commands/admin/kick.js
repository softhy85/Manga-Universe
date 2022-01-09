const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            description: {
                content: 'La commande kick expulse une personne du serveur.',
                usage: 'kick <member> <raison>',
                exemples: ['kick @Softy', 'kick @Softy Pourquoi pas']
            },
            category: 'Admin',
            channel: 'guild',
            args: [
                { id: 'member', type: 'member', dafault: 'member', required: true },
                { id: 'reason', type: 'string', match: 'restContent', default: 'Raison non spécifié' }
            ],
            clientPermission: ['KICK_MEMBERS']
        });
    }

    async exec(message, { member, reason }) {
        if (message.guild) {
            var ok = await this.client.isUserAdmin(message.member);
            const guilds = await this.client.guildSettings.getAll();
            const messageError = "Earth Chan n'a pas trouvé cet utilisateur !";
            var logChannel = message.channel;
            for (var key in guilds) {
                if (guilds[key].idChannelCommands) {
                    logChannel = this.client.channels.cache.get(guilds[key].idChannelCommands);
                }
            }


            if (ok === true) {
                if (member) {
                    member.kick(reason);
                    const embed = new MessageEmbed()
                        .setColor('#F0E92E')
                        .setAuthor(`${message.member.user.username} (${message.member.user.id})`, message.member.user.displayAvatarURL())
                        .setTitle(`Kick ${member.user.username}(${member.user.id})`)
                        .setThumbnail(member.user.displayAvatarURL())
                        .setDescription(reason)
                        .setTimestamp()
                        .setFooter('Earth Chan vous dit à la prochaine', 'https://i.imgur.com/xOl5Quf.png');

                    return logChannel.send({ embeds: [embed] });
                } else {
                    return logChannel.send(messageError);
                }
            }
        }
    }
}

module.exports = KickCommand;