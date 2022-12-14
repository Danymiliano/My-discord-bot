const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
        .setNameLocalizations({
            ru: 'рандом',
        })
		.setDescription('Pick a captain from the voice channel')
        .setDescriptionLocalizations({
            ru: 'Выбрать капитана из голосового канала',
        }),
	async execute(interaction) {

		return interaction.reply(`${interaction.member.voice.channel.id}`);
	},
};

// const GuildMember = message.guild.members;

// const channel = message.guild.channels.get('voiceChannelID'); //replace voiceChannelID with your voice Channel ID

// let toCheck = channel.members;

// message.reply('a random person: ' + toCheck.random());


// ephemeral: true - для сообщений, не отображающихся у других пользователей
// await interaction.reply({ content: 'Secret Pong!', ephemeral: true });

// deffered response - отложенные ответы
// await interaction.deferReply();
// await wait(4000);
// await interaction.editReply('Pong!');