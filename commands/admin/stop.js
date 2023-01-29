const { successEmbed } = require('../../helpers/embeds.js');

module.exports = {
    info: {
        name: 'stop',
        description: 'Stops the bot.',
        options: [],
        permissions: ['OWNER']
    },
    run: async (interaction) => {
        interaction.reply({ embeds: [successEmbed('Goodbye!')] });
        setTimeout(() => {
            process.exit();
        }, 1000);
    }
};
