// Добавляем классы из библиотеки discord js
// Добавляем токен
// Добавляем fs-встроенный модуль для работы с файлами
// Добавляем path-встроенный модуль для оптимизации ссылок
const fs = require('node:fs')
const path = require('node:path')

const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js')
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits
const { User, Message, GuildMember, ThreadMember, Channel } = Partials


const { token } = require('./config.json')

// Создаём инстанс класса Client (бота);
const client = new Client({
    intents: [ GatewayIntentBits.Guilds ],
    partials: [ User, Message, GuildMember, ThreadMember]
})

// Сохраняем наши команды в коллекцию
client.commands = new Collection()
// -----------------------------------------------------------------------------------------------------------------------

// Получаем путь к папке команд
const commandsPath = path.join(__dirname, 'commands')

const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command) // Добавляем в коллекцию наши команды, если там есть
        // строки 'data' и 'execute'. В остальных случаях вываливаем предупреждение.
    } else {
        console.log(`Предупреждение: Команда ${filePath} не содержит требуемых свойств 'data' или 'execute'`);
    }
}
// -----------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------

// Получаем доступ к папке ивентов
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// -----------------------------------------------------------------------------------------------------------------------

// Логинимся по токену
client.login(token)