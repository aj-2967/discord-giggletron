const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;

async function getJokeFromAPI() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any';

    try {
        const response = await axios.get(apiUrl);
        const jokeData = response.data;

        if (jokeData.type === 'single' || jokeData.type === 'twopart') {
            return jokeData
        } else {
            throw new Error('Unexpected API response.');
        }
    } catch (error) {
        console.error('Error fetching joke:', error.message);
        throw error;
    }
}

async function fetchAndShowJoke() {
  try {
    const joke = await getJokeFromAPI();
    return joke;
  } catch (error) {
    console.error('Failed to fetch joke:', error.message);
  }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Enlighten a joke'),
    async execute(interaction) {
        await interaction.deferReply();
        const newJoke = await fetchAndShowJoke();
        
        if (newJoke.type === 'single' || newJoke.type === 'twopart') {
            if (newJoke.type === 'single') {
                    await wait(2000);
                    await interaction.editReply(newJoke.joke);
            } else {
                    await wait(2000);
                    await interaction.editReply(newJoke.setup);

                    await wait(5000);
                    await interaction.followUp(newJoke.delivery);
            }
                
        }
	},
};