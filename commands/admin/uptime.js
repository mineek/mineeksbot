const { EmbedBuilder } = require('discord.js');

module.exports = {
    info: {
        name: 'uptime',
        description: 'Shows the uptime of the bot.',
        options: [],
        permissions: []
    },
    run: async (interaction) => {
        const embed = new EmbedBuilder()
            .setTitle('Uptime')
            .setDescription(`I've been online for ${Math.floor(interaction.client.uptime / 1000 / 60 / 60)} hours, ${Math.floor(interaction.client.uptime / 1000 / 60 % 60)} minutes, and ${Math.floor(interaction.client.uptime / 1000 % 60)} seconds.`)
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter({ text: `Mineek's Bot | Made by Mineek#6323` });
        return interaction.reply({ embeds: [embed] });
    }
};