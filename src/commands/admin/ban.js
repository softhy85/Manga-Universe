const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            description: {
                content: 'La commande ban expulsé pour de bon une personne du serveur.',
                usage: 'ban <member> <days> <raison>',
                exemples: ['ban @Softy', 'ban @Softy Pourquoi pas']
            },
            category: 'Admin',
            channel: 'guild',
            args: [
                { id: 'member', type: 'string', dafault: 'member', required: true },
                { id: 'days', type: 'number', default: '7' }
                { id: 'reason', type: 'string', match: 'restContent', default: 'Raison non spécifié' }
            ],
            clientPermission: ['KICK_MEMBERS']
        });
    }

    async exec(message, { member, days, reason }) {
        if (message.guild) {
            var ok = await this.client.isUserAdmin(message.member);
            const guilds = await this.client.guildSettings.getAll();
            const messageError = "Earth Chan n'a pas trouvé cet utilisateur !"
            var logChannel = message.channel;
            for (var key in guilds) {
                if (guilds[key].idChannelCommands) {
                    logChannel = this.client.channels.cache.get(guilds[key].idChannelCommands);
                }
            }


            if (ok === true) {
                if (member) {
                    member.ban({ days: days, reason: reason });
                    const embed = new MessageEmbed()
                        .setColor('#F0E92E')
                        .setAuthor(`${message.member.user.username} (${message.member.user.id})`, message.member.user.displayAvatarURL())
                        .setTitle(`Ban ${member.user.username}(${member.user.id})`)
                        .setThumbnail(args.member.user.displayAvatarURL())
                        .setDescription(`Ban for ${days} days, ${reason}`)
                        .setTimestamp()
                        .setFooter('Earth Chan vous dit à la prochaine', 'https://i.imgur.com/xOl5Quf.png');

                    return logChannel.send({ embeds: [embed] });
                } else {
                    return logChannel.send(messageError);
                }
            }
        }
    }

module.exports = BanCommand;