const { SlashCommandBuilder } = require('@discordjs/builders');

const getJoke = () => {
    return 'haha';
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Enlighten a joke'),
        run: ({ interaction }) => {
            interaction.reply(getJoke());
        }
};