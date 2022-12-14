const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];
// Берём все файлы из папки с командами
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Берём SlashCommandBuilder#toJSON (строку JSONа) для каждой команды
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    console.log(command);
	commands.push(command.data.toJSON());
}

// Создаём инстанс класса REST
const rest = new REST({ version: '10' }).setToken(token);

// и деплоим команды на клиент дискорда
(async () => {
	try {
		console.log(`Начинаем обновлять ${commands.length} слэш-команды.`);

		// Метод put используется для обновления всех команд на текущем сервере
        // в соответствии с передаваемыми настройками
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Успешно обновили ${data.length} слэш-команды.`);
	} catch (error) {
		// Проверяем на наличие ошибок
		console.error(error);
	}
})();