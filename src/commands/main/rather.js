const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios');

async function getQuestionFromAPI() {
    const apiUrl = 'https://would-you-rather-api.abaanshanid.repl.co/';

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data && data.data) {
            return data.data;
        } else {
            throw new Error('Unexpected API response.');
        }
    } catch (error) {
        console.error('Error fetching question:', error.message);
        throw error;
    }
}

async function fetchAndShowQuestions() {
  try {
    const data = await getQuestionFromAPI();
    return data;
  } catch (error) {
    console.error('Failed to fetch question:', error.message);
  }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('question')
        .setDescription('Ask would your rather questions'),
    async execute(interaction) {
        await interaction.deferReply();
        const question = await fetchAndShowQuestions();
        
        const embed = new EmbedBuilder()
            .setColor(0xFCE029)
            .setTitle(question)

        await interaction.editReply({ embeds: [embed] });
	},
};