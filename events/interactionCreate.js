const { Events } = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
	
        const command = interaction.client.commands.get(interaction.commandName)

        if (!command) {
        console.error(`Команды ${interaction.commandName} не было найдено.`)
        return
    }

        try {
        await command.execute(interaction)
    }   catch (error) {
        console.error(error)
        await interaction.reply({ content: 'Произошла ошибка при выполнении этой команды!', ephemeral: true})
    }
	},
};