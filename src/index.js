const GotoClient = require('./structures/GotoClient');
const { registerFont } = require('canvas');

require('dotenv').config();
registerFont('./src/animeace2_bld.ttf', { family: 'Anime Ace 2.0 BB' });

let client = new GotoClient({ prefix: '!' });

client.start();