const {successEmbed, errorEmbed} = require('../../helpers/embeds.js');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    info: {
        name: 'help',
        description: 'Shows a list of all commands or info about a specific command.',
        options: [
            {
                name: 'command',
                description: 'The command you want info about.',
                type: 3,
                required: false
            }
        ],
        permissions: []
    },
    run: async (interaction) => {
        const command = interaction.options.getString('command');
        if (command) {
            const cmd = interaction.client.commands.get(command);
            if (!cmd) return interaction.reply({ embeds: [errorEmbed(`That's not a valid command!`)] });
            const embed = new EmbedBuilder()
                .setTitle(`Command: ${cmd.info.name}`)
                .setDescription(cmd.info.description)
                .setColor(0x00FF00)
                .setTimestamp()
                .setFooter({ text: `Mineek's Bot | Made by Mineek#6323` });
            if (cmd.info.options.length > 0) {
                embed.addFields({ name: 'Options', value: cmd.info.options.map(opt => `\`${opt.name}\` - ${opt.description}`).join('\n'), inline: false });
            }
            if (cmd.info.permissions.length > 0) {
                embed.addFields({ name: 'Permissions', value: cmd.info.permissions.map(perm => `\`${perm}\``).join(', '), inline: false });
            }
            return interaction.reply({ embeds: [embed] });
        }
        const embed = new EmbedBuilder()
            .setTitle('Commands')
            .setDescription('Here\'s a list of all my commands:')
            .setColor(0x00FF00)
            .setTimestamp()
            .setFooter({ text: `Mineek's Bot | Made by Mineek#6323` });
        const categories = [];
        interaction.client.commands.forEach(cmd => {
            if (!categories.includes(cmd.info.category)) categories.push(cmd.info.category);
        });
        categories.forEach(category => {
            interaction.client.commands.forEach(cmd => {
                if (cmd.info.category === category) {
                    embed.addFields({ name: category, value: `\`${cmd.info.name}\` - ${cmd.info.description}`, inline: false });
                }
            });
        });
        return interaction.reply({ embeds: [embed] });
    }
};
