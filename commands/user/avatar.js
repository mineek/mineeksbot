const { EmbedBuilder } = require('discord.js');

module.exports = {
    info: {
        name: 'avatar',
        description: 'Shows the avatar of a user, or your own avatar.',
        options: [
            {
                name: 'user',
                description: 'The user to show the avatar of.',
                type: 6,
                required: false
            }
        ],
        permissions: []
    },
    run: async (interaction) => {
        const user = interaction.options.getUser('user') || interaction.user;
        const embed = new EmbedBuilder()
            .setTitle(`${user.username}'s Avatar`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }))
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter({ text: `Mineek's Bot | Made by Mineek#6323` });
        return interaction.reply({ embeds: [embed] });
    }
};