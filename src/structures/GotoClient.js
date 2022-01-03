const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');

module.exports = class GotoClient extends AkairoClient {
    constructor(config = {}) {
        super(
            { ownerID: '260375764212383744' },
            {
                allowedMentions: {
                    parse: ['roles', 'everyone', 'users'],
                    repliedUser: false,
                },
                partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
                presence: {
                    status: 'dnd',
                    activities: [
                        {
                            name: 'Watching the universe <3',
                            type: 'WATCHING'
                        }
                    ]
                },
                intents: 32767
            }
        );

        this.CommandHandler = new CommandHandler(this, {
            allowMention: true,
            prefix: config.prefix,
            defaultCooldown: 2000,
            directory: './src/commands/'
        });

        this.ListenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });

        this.CommandHandler.loadAll();
        this.CommandHandler.useListenerHandler(this.ListenerHandler);
        this.ListenerHandler.loadAll();
    }
}