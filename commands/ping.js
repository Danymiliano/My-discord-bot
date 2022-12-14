const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
        .setNameLocalizations({
            ru: 'пинг',
        })
		.setDescription('Responses: Pong!')
        .setDescriptionLocalizations({
            ru: 'Отвечает: "Понг"',
        }),
	async execute(interaction) {
		return interaction.reply('Понг!');
	},
};

// ephemeral: true - для сообщений, не отображающихся у других пользователей
// await interaction.reply({ content: 'Secret Pong!', ephemeral: true });

// deffered response - отложенные ответы
// await interaction.deferReply();
// await wait(4000);
// await interaction.editReply('Pong!');