const { QuickDB } = require('quick.db');
const { addTotalCommandCountBot, addTotalCommandCountGuild } = require('../../utils/functions');
const db = new QuickDB();

module.exports = {
    name: 'messageCreate',

    async execute(message, bot) {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(bot.config.botPrefix)) return;
        const [cmd, ...args] = message.content.slice(bot.config.botPrefix.length).trim().split(" ");
        const command = bot.commands.get(cmd.toLowerCase()) || bot.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
        
        if (!command) return;
        
        if (command.ownerOnly) {
            if (message.author.id !== bot.config.ownerID) {
                return message.reply({ content: "This command only for Bot Owner!", allowedMentions: { repliedUser: false } });
            }
        }

        if (message.content.toLowerCase().startsWith(bot.config.botPrefix)) {
            addTotalCommandCountBot(`totalcommandcountbot`, 1)
            addTotalCommandCountGuild(message.guild.id, 1)
        }
        await command.run(bot, message, args);

    }
}