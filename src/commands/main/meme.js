const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

async function getMemeFromAPI() {
    const apiUrl = 'https://meme-api.com/gimme/1';

    try {
        const response = await axios.get(apiUrl);
        const memeData = response.data;

        if (memeData && memeData.memes && memeData.memes.length > 0) {
            return memeData.memes[0]
        } else {
            throw new Error('Unexpected API response.');
        }
    } catch (error) {
        console.error('Error fetching meme:', error.message);
        throw error;
    }
}

async function fetchAndShowMeme() {
  try {
    const meme = await getMemeFromAPI();
    return meme;
  } catch (error) {
    console.error('Failed to fetch meme:', error.message);
  }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Meme materials'),
    async execute(interaction) {
        await interaction.deferReply();
        const meme = await fetchAndShowMeme();
        
        const exampleEmbed = new EmbedBuilder()
            .setColor(0xFCE029)
            .setTitle(meme.title)
            .setURL(meme.postLink)
            .setImage(meme.url)
        
        await interaction.editReply({ embeds: [exampleEmbed] });
	},
};