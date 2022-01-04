const { Schema, model } = require('mongoose');

const guildSchema = Schema({
    id: String,
    prefix: {
        type: String,
        default: '!'
    },
    roles: [],
    idChannelArrive: '',
    idChannelPartir: '',
    idChannelCommands: ''
})

module.exports = {
    Guild: model('Guild', guildSchema)
};