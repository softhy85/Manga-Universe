const mongoose = require('mongoose');
const { TOKEN, MONGO_STR } = require('../util/config');
const { GuildsProvider } = require('../structures/Providers')
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
            prefix: async message => {
                const guildPrefix = await this.guildSettings.get(message.guild);
                if (guildPrefix) return guildPrefix.prefix;
                return config.prefix;
            },
            defaultCooldown: 2000,
            directory: './src/commands/'
        });

        this.ListenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });

        this.guildSettings = new GuildsProvider();
    }

    async isUserAdmin(member) {
        const guild = await this.guildSettings.get(member.guild);
        const serverRoles = guild.roles;

        if (!serverRoles) {
            return (true);
        } else if (serverRoles.size == 0) {
            return (true);
        } else if (!serverRoles.find(serverRole => serverRole.admin)) {
            return (true);
        }

        var ok = false;
        const roles = member.roles.cache;
        roles.forEach((role) => { })
        for (var [key, value] of roles) {
            for (var key in serverRoles) {
                if (value.id === serverRoles[key].id && serverRoles[key].admin) {
                    ok = true;
                }
            }
        }
        return (ok);
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
            if (process.env.MONGO_STR) {
                await mongoose.connect(process.env.MONGO_STR, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            } else {
                await mongoose.connect(MONGO_STR, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
            }
            console.log("DB connectée!");
        } catch (e) {
            console.log("DB non connectée !\n\n", e);
            return process.exit();
        }

        await this.init();
        try {
            if (process.env.TOKEN) {
                this.login(process.env.TOKEN);
            } else {
                this.login(TOKEN);
            }
        } catch (e) {
            console.log("Login erreur\n\n", e);
            return process.exit();
        }
    }
}
