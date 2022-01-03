const { Command } = require('discord-akairo');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const Canvas = require('canvas');

class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test']
        });
    }

    async test(message) {
        const canvas = Canvas.createCanvas(700, 250);
        const context = canvas.getContext('2d');

        // Start Ajouter Background
        const background = await Canvas.loadImage('https://i.imgur.com/kbuxaSd.jpg');

        context.drawImage(background, 0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#0099ff';
        context.strokeRect(0, 0, canvas.width, canvas.height);
        // End Ajouter Background

        // Start Ajouter Text
        context.font = '60px sans-serif';
        context.fillStyle = '#000000';
        context.fillText(message.author.username, canvas.width / 2.5 + 1, canvas.height / 1.8 + 1);

        context.font = '60px sans-serif';
        context.fillStyle = '#ffffff';
        context.fillText(message.author.username, canvas.width / 2.5, canvas.height / 1.8);
        // End Ajouter Text

        // Start Ajouter Image de Profile
        const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }));

        context.beginPath();
        context.arc(125, 125, 100, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        context.drawImage(avatar, 25, 0, 225, 225);
        // End Ajouter Image de Profile

        const attachment = new MessageAttachment(canvas.toBuffer(), 'profile-image.png');

        const embed = new MessageEmbed()
            .setColor('#dac147')
            .setTitle(`${message.author.username} a rejoint la bataille !`)

        return message.channel.send({ embeds: [embed], files: [attachment] });
    };

    exec(message) {
        return this.test(message);
    }
}

module.exports = TestCommand;