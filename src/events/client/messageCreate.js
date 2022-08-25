const { addTotalCommandCount } = require("../../utils/functions.js");

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

        if (message.content.toLowerCase().startsWith(bot.config.botPrefix))
        db.add(`global_commands`, 1)
        await command.run(bot, message, args);

    }
}