const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const path = require('path');
require('dotenv').config();

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

new CommandHandler({ 
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    // testServer: process.env.GUILD_ID
 })

client.on('ready', (c) => {
    console.log(`${c.user.username} is online and ready`);

    // Set online presence status
    client.user.setActivity({
        name: 'memes',
        type: ActivityType.Watching
    })
});

client.on('messageCreate', (message) => {

    // Confirm the user is not a bot
    if (message.author.bot) return;

    if (message.content === 'hey') {
        message.reply('Hey!');
    }
    
    if (message.content === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('Embed Title')
            .setDescription('This is a description')
            .setColor('Random') // Custom color code prefexed with: 0x
            .addFields({
                name: 'Field Title',
                value: 'Field Value',
                // inline: true
            })

        // Reply
        // message.reply({ embeds: [embed] })

        // Send to channel
        message.channel.send({ embeds: [embed] })
    }
});

// client.on('interactionCreate', async (interaction) => {
//     // Slash command interactions
//     if (interaction.isChatInputCommand()) {

//         if (interaction.commandName === 'hey') {
//             interaction.reply('Hey!');
//         }
//     }
// })

client.login(process.env.TOKEN);

