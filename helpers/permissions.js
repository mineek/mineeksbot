const {ownerID} = require('../config.json');
const {errorEmbed} = require('./embeds.js');

const checkPermissions = (interaction, permissions) => {
    if (interaction.user.id === ownerID) return true;
    if (permissions.length === 0) return true;
    if (permissions.includes('OWNER')) return false;
    const guild = interaction.guild;
    const member = guild.members.cache.get(interaction.user.id);
    const perms = member.permissions.toArray();
    for (const perm of permissions) {
        if (!perms.includes(perm)) {
            return false;
        }
    }
    return true;
}

module.exports = {
    checkPermissions
};