module.exports = {
    info: {
        name: 'say',
        description: 'Says a message.',
        options: [
            {
                name: 'message',
                description: 'The message to say.',
                type: 3,
                required: true
            }
        ],
        permissions: ['Administrator']
    },
    run: async (interaction) => {
        const message = interaction.options.getString('message');
        await interaction.channel.send(message);
        await interaction.reply({ content: 'Sent!', ephemeral: true });
    }
};
