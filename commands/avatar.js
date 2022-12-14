const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Создаёт ссылку на ваш аватар или на аватар выбранного участника')
		.addUserOption(option => option.setName('target').setDescription('Участники, на чьи аватары вывести ссылки')),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		if (user) return interaction.reply(`Ссылка на аватар ${user.username}: ${user.displayAvatarURL({ dynamic: true })}`);
		return interaction.reply(`Ссылка на ваш аватар: ${interaction.user.displayAvatarURL()}`);
	},
};