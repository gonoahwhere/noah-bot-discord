const { readdirSync } = require("fs");

module.exports = {
    name: 'info',
    usage: 'n.info',
    category: 'Bot',
    description: 'Learn more about my mechanics.',
    ownerOnly: false,
    run: async(bot, message, args) => {

        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        let infoEmbed = new bot.discord.MessageEmbed()
        .setAuthor({ name: `◠ Information [${bot.commands.cache.size}] ◡`, iconURL: bot.user.displayAvatarURL() })
        .setDescription('Beep Boop. I am the droid version of sir noah.')
        .addFields(
            { name: 'Owner / Developer', value: '`Noah💙#6336`', inline: true },
            //{ name: 'Hatched On', value: '`August 21st, 2022`', inline: true },
            { name: 'Uptime', value: `\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\``, inline: true },
            //{ name: 'Servers', value: `\`${bot.guilds.cache.size}\``, inline: true },
            //{ name: 'Users', value: `\`${bot.users.cache.size}\``, inline: true },
            //{ name: 'Version', value: '`1.0.1-beta`', inline: true }
        )
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.config.embedColor)

        message.reply({ allowedMentions: { repliedUser: false }, embeds: [infoEmbed] });

    }
}