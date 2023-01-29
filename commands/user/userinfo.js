const { EmbedBuilder } = require('discord.js');

module.exports = {
    info: {
        name: 'userinfo',
        description: 'Shows info about a user.',
        options: [
            {
                name: 'user',
                description: 'The user to show info about.',
                type: 6,
                required: false
            }
        ],
        permissions: []
    },
    run: async (interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = interaction.guild.members.cache.get(user.id);
        const embed = new EmbedBuilder()
            .setTitle('Userinfo')
            .setDescription(`Here's some info about ${user.username}#${user.discriminator}`)
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter({ text: `Mineek's Bot | Made by Mineek#6323` });
        embed.addFields({ name: 'Name', value: `${user.username}#${user.discriminator}`, inline: true });
        embed.addFields({ name: 'ID', value: `${user.id}`, inline: true });
        embed.addFields({ name: 'Nickname', value: `${member.nickname || 'None'}`, inline: true });
        embed.addFields({ name: 'Account Created At', value: `${user.createdAt.toDateString()}`, inline: true });
        embed.addFields({ name: 'Joined Server At', value: `${member.joinedAt.toDateString()}`, inline: true });
        embed.addFields({ name: 'Roles', value: `${member.roles.cache.map(role => role.toString()).join(' ')}`, inline: true });
        embed.setAuthor({ name: user.username, iconURL: user.avatarURL({ dynamic: true }) });
        return interaction.reply({ embeds: [embed] });
    }
};