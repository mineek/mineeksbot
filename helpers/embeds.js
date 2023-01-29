const {EmbedBuilder} = require('discord.js');

const successEmbed = (msg) => new EmbedBuilder()
    .setTitle('yaay')
    .setDescription(msg)
    .setColor(0x00FF00)
    .setTimestamp()
    .setFooter({ text: `Mineek's Bot | Made by Mineek#6323` });

const errorEmbed = (msg) => new EmbedBuilder()
    .setTitle('oh shit')
    .setDescription(msg)
    .setColor(0xFF0000)
    .setTimestamp()
    .setFooter({ text: `Mineek's Bot | Made by Mineek#6323` });

module.exports = {successEmbed, errorEmbed};