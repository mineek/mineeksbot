const { EmbedBuilder } = require('discord.js');

module.exports = {
    info: {
        name: '8ball',
        description: 'Ask the magic 8ball a question.',
        options: [
            {
                name: 'question',
                description: 'The question to ask the magic 8ball.',
                type: 3,
                required: true
            }
        ],
        permissions: []
    },
    run: async (interaction) => {
        const question = interaction.options.getString('question');
        const responses = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'Don\'t count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'
        ];
        const response = responses[Math.floor(Math.random() * responses.length)];
        const embed = new EmbedBuilder()
            .setTitle('8ball')
            .setDescription(`${interaction.user.username} asked ${question}`)
            .addFields({ name: "Answer", value: response })
            .setTimestamp()
            .setFooter({text: "Mineek's Bot | Made by Mineek#6323"})
            .setColor(0x00FF00);
        return interaction.reply({ embeds: [embed] });
    }
};