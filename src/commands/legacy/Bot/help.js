const { readdirSync } = require("fs");

module.exports = {
    name: 'help',
    usage: 'n.help',
    category: 'Bot',
    description: 'Return all commands, or one specific command!.',
    ownerOnly: false,
    run: async(bot, message, args) => {

        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        let infoEmbed = new bot.discord.MessageEmbed()

        const helpEmbed = new bot.discord.MessageEmbed()
        .setAuthor(`◠ Mechanic Centre [${bot.commands.size}] ◡`)
        .setDescription(`∘∘∘ Beep Boop. Droid of sir noah at your service. How may I help you? ∘∘∘`)
        .addFields(
            { name: '➳ Parts', value: botCommandsList.map((data) => `${data}`).join(", "), inline: true }
        )
        .setColor(bot.config.embedColor)
        .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });

        message.reply({ allowedMentions: { repliedUser: false }, embeds: [infoEmbed] });

    }
}