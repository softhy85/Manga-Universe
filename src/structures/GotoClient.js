const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { TOKEN, MONGO_STR } = require('../util/config');
const mongoose = require('mongoose');

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
    }

    init() {
        this.CommandHandler.loadAll();
        this.CommandHandler.useListenerHandler(this.ListenerHandler);
        console.log(`Commandes -> ${this.CommandHandler.modules.size}`);
        this.ListenerHandler.loadAll();
        console.log(`Listeners -> ${this.ListenerHandler.modules.size}`);
    }

    async start() {
        try {
            await mongoose.connect(MONGO_STR, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log("DB connectée!");
        } catch (e) {
            console.log("DB non connectée !\n\n", e);
            return process.exit();
        }

        await this.init();
        try {
            this.login(TOKEN);
        } catch (e) {
            console.log("Login erreur\n\n", e);
            return process.exit();
        }
    }
}
