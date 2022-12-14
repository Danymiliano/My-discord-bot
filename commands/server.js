const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Отображает информацию об этом сервере'),
	async execute(interaction) {
		return interaction.reply(`Имя сервера: ${interaction.guild.name}\nВсего участников: ${interaction.guild.memberCount}`);
	},
};