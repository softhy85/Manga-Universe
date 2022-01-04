const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo'],
            category: 'Misc',
            description: {
                content: "La commande userinfo renvoie les informations de l'utilisateur",
                usage: 'userinfo <member>',
                exemples: ['userinfo', 'userinfo @member']
            },
            ignoreCooldown: '260375764212383744',
            ignorePermission: '260375764212383744',
            userPermission: 'KICK_MEMBERS',
            clientPermission: 'KICK_MEMBERS',
            cooldown: 5000,
            typing: true,
            channel: 'guild',
            args: [
                { id: 'member', type: 'member', default: message => message.member }
            ]
        });
    }

    exec(message, args) {
        const dateCreation = args.member.user.createdAt;
        var dateCreationAffichage = dateCreation.toDateString();

        const embed = new MessageEmbed()
            .setColor('#2152CA')
            .setTitle(`Info : ${args.member.displayName} (${args.member.id})`)
            .setThumbnail(args.member.user.displayAvatarURL())
            .setDescription(`Création le ${dateCreationAffichage}`)
            .setTimestamp()
            .setFooter('Earth Chan vous dit à la prochaine', 'https://i.imgur.com/xOl5Quf.png');

        return message.channel.send({ embeds: [embed] });
    }
}

module.exports = UserInfoCommand;