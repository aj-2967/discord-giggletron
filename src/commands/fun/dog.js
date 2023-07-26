const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

async function getApiData() {
    const apiUrl = 'https://dog.ceo/api/breeds/image/random';

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data && data.status === 'success' && data.message) {
            return data.message;
        } else {
            throw new Error('Unexpected API response.');
        }
    } catch (error) {
        console.error('Error fetching question:', error.message);
        throw error;
    }
}

async function fetchAndShowDogs() {
  try {
    const data = await getApiData();
    return data;
  } catch (error) {
    console.error('Failed to fetch question:', error.message);
  }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dog')
        .setDescription('Good dogs'),
    async execute(interaction) {
        await interaction.deferReply();
        const image = await fetchAndShowDogs();
        
        const embed = new EmbedBuilder()
            .setColor(0xFCE029)
            .setImage(image)

        await interaction.editReply({ embeds: [embed] });
	},
};