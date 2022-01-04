const GotoClient = require('./structures/GotoClient');
const { registerFont } = require('canvas');

registerFont('./src/animeace2_bld.ttf', { family: 'Anime Ace 2.0 BB' });

let client = new GotoClient({ prefix: '!' });

client.start();