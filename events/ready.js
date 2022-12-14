const { Events } = require('discord.js')

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Бот с ником ${client.user.tag} успешно поднялся`);
	},
};