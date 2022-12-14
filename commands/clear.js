const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Удалить заданное количество сообщений от выбранного участника или из канала')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption(option => 
        option.setName('amount')
    .setDescription('Количество сообщений, которые хотите удалить')
    .setRequired(true)
        )
        .addUserOption(option => option
            .setName('target')
            .setDescription('Выберите участника, чьи сообщения хотите удалить')
            .setRequired(false)),

    async execute(interaction) {
        const { channel, options } = interaction

        const amount = options.getInteger('amount')
        const target = options.getUser('target')

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        })

        const res = new EmbedBuilder()
        .setColor(0x5fb041)

        if (target) {
            let i = 0;
            const filtered = []

            await messages.filter(msg => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg)
                    i++
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`Успешно удалили ${messages.size} сообщений от ${target}.`)
                interaction.reply({ embeds: [res], ephemeral: true })
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`Успешно удалили ${messages.size} сообщений из канала.`)
                interaction.reply({ embeds: [res], ephemeral: true })
            })
        }
    }
}