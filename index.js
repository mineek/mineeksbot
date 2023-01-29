const { Client, Events, GatewayIntentBits, REST, Routes, EmbedBuilder } = require('discord.js');
const { token, guildID, ownerID } = require('./config.json');
const fs = require('fs');
const { dir } = require('console');
const {successEmbed, errorEmbed} = require('./helpers/embeds.js');
const {checkPermissionsEmbed, checkPermissions} = require('./helpers/permissions.js');

const log = (msg) => console.log(`[${new Date().toLocaleTimeString()}] -> ${msg}`);

const statuses = [
    'Made by Mineek#6323',
    'palera1n best jelbrek!11!1'
];

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Map();

fs.readdirSync('./commands').forEach(dir => {
    const commands = fs.readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dir}/${file}`);
        log(`Loaded command ${command.info.name}`);
        command.info.category = dir;
        client.commands.set(command.info.name, command);
    }
}); 

client.on(Events.ClientReady, () => {
    log(`Logged in as ${client.user.tag}!`);
    log(`Guilds: ${client.guilds.cache.size}`);
    log(`Users: ${client.users.cache.size}`);
    log(`Setting status...`);
    setInterval(() => {
        client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 10000);
    log(`Registering commands...`);
    const rest = new REST({ version: '9' }).setToken(token);
    const commands = [];
    client.commands.forEach(cmd => {
        commands.push(cmd.info);
    });
    (async () => {
        try {
            log('Started refreshing application (/) commands.');
            await rest.put(
                Routes.applicationGuildCommands(client.user.id, guildID),
                { body: commands },
            );
            log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();
});

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    if (command.info.permissions.length > 0) {
        if (!checkPermissions(interaction.member, command.info.permissions)) {
            return interaction.reply({ embeds: [checkPermissionsEmbed(command.info.permissions)] });
        }
    }
    log(`Command ${command.info.name} executed by ${interaction.user.tag} (${interaction.user.id})`);
    try {
        await command.run(interaction);
    }
    catch (error) {
        console.error(error);
        await interaction.reply({ embeds: [errorEmbed('An error occurred while executing this command!')] });
    }
});

client.login(token);