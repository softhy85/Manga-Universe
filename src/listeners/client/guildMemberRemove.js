const { Listener } = require('discord-akairo');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async imageRemoveChannel(member, channel) {
        const usernameComplet = member.user.username;
        var usernameCrop = usernameComplet;
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        // Start Ajouter Background
        const background = await Canvas.loadImage('https://i.imgur.com/UbhgFxT.jpg');

        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);
        // End Ajouter Background

        // Start Ajouter Text
        if (usernameCrop.length > 11) {
            usernameCrop = usernameCrop.slice(0, 11) + '...'
        }

        context.font = '40px "Anime Ace 2.0 BB"';
        context.fillStyle = '#000000';
        context.fillText(usernameCrop, canvas.width / 2.5 + 2, canvas.height / 1.8 + 2);

        context.font = '40px "Anime Ace 2.0 BB"';
        context.fillStyle = '#ffffff';
        context.fillText(usernameCrop, canvas.width / 2.5, canvas.height / 1.8);
        // End Ajouter Text

        // Start Ajouter un cadre à l'Image de Profile
        context.beginPath();
        context.arc(125, 125, 105, 0, Math.PI * 2, true);
        context.fillStyle = '#2F7BEF';
        context.closePath();
        context.fill();
        // End Ajouter un cadre à l'Image de Profile

        // Start Ajouter Image de Profile
        const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        context.drawImage(avatar, 25, 25, 200, 200);
        // End Ajouter Image de Profile

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        const embed = new MessageEmbed()
            .setColor('#dac147')
            .setTitle(`${usernameComplet} a deserté la bataille !`)
            .setTimestamp()
            .setFooter('Earth Chan vous dit à la prochaine', 'https://i.imgur.com/xOl5Quf.png');

        console.log(`${usernameComplet} a deserté la bataille !`);
        return channel.send({ embeds: [embed], files: [attachment] });
    };

    async exec(member) {
        const guild = await this.client.guildSettings.get(member.guild);
        if (guild.idChannelPartir) {
            const channel = this.client.channels.cache.get(guild.idChannelPartir);
            return (this.imageRemoveChannel(member, channel));
        }
    }
}

module.exports = GuildMemberRemoveListener;