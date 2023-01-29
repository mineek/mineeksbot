const {ownerID} = require('../config.json');
const {errorEmbed} = require('./embeds.js');

const checkPermissions = (interaction, permissions) => {
    if (!interaction.member) return false;
    if (interaction.member.id === ownerID) return true;
    if (permissions.length === 0) return true;
    const memberPermissions = interaction.member.permissions;
    return permissions.every(permission => memberPermissions.has(permission));
}

const checkPermissionsEmbed = (interaction, permissions) => {
    if (!checkPermissions(interaction, permissions)) {
        return interaction.reply({ embeds: [errorEmbed(`You don't have the required permissions to run this command!`)] });
    }
}

module.exports = {
    checkPermissions,
    checkPermissionsEmbed
};