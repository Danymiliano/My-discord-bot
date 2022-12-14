const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Получает данные об участнике'),
async execute(interaction) {
    await interaction.reply(`Участник **${interaction.user.username}** присоединился к серверу *${interaction.member.joinedAt.toLocaleString()}*` )
} 
}
