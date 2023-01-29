const { EmbedBuilder } = require('discord.js');

module.exports = {
    info: {
        name: 'about',
        description: 'Shows info about the bot.',
        options: [],
        permissions: []
    },
    run: async (interaction) => {
        const version = require('../../package.json').version;
        const embed = new EmbedBuilder()
            .setTitle('About')
            .setDescription('Here\'s some info about me:')
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter({ text: `Mineek's Bot | Made by Mineek#6323` });
        embed.addFields({ name: 'Name', value: `${interaction.client.user.username}#${interaction.client.user.discriminator}`, inline: true });
        embed.addFields({ name: 'ID', value: `${interaction.client.user.id}`, inline: true });
        embed.addFields({ name: 'Commands', value: `${interaction.client.commands.size}`, inline: true });
        embed.addFields({ name: 'Servers', value: `${interaction.client.guilds.cache.size}`, inline: true });
        embed.addFields({ name: 'Users', value: `${interaction.client.users.cache.size}`, inline: true });
        embed.addFields({ name: 'Version', value: `${version}`, inline: true });
        embed.addFields({ name: 'Developer', value: 'Mineek#6323', inline: true });
        embed.addFields({ name: 'Source Code', value: '[Click here](https://github.com/mineek/mineeksbot)', inline: true });
        embed.addFields({ name: 'Uptime', value: `${Math.floor(interaction.client.uptime / 1000 / 60 / 60)} hours, ${Math.floor(interaction.client.uptime / 1000 / 60 % 60)} minutes, and ${Math.floor(interaction.client.uptime / 1000 % 60)} seconds`, inline: true });
        return interaction.reply({ embeds: [embed] });
    }
};