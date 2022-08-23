module.exports = {
    name: "info",
    category: "Bot",
    description: "Learn more about my mechanics.",
    ownerOnly: false,
    run: async (bot, interaction) => {
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        const date = new Date();

        function changeTimeZone(date, timeZone) {
            if (typeof date === 'string') {
              return new Date(
                new Date(date).toLocaleString('en-US'),
              );
            }
          
            return new Date(
              date.toLocaleString('en-US'),
            );
        }
        const londonDate = changeTimeZone(new Date(), 'Europe/London');
        console.log(londonDate);
          
        let infoEmbed = new bot.discord.MessageEmbed()
        .setAuthor({ name: `◠ Information ◡`, iconURL: bot.user.displayAvatarURL() })
        .setDescription('∘∘∘ Beep Boop. I am the droid version of sir noah ∘∘∘')
        .addFields(
            { name: '➳ Assembled', value: '`15th Dec 2021`', inline: true },
            { name: '➳ Master', value: '`Noah💙#6336`', inline: true },
            { name: '➳ Lived For', value: `\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\``, inline: true },
            { name: '➳ Workers', value: `\`${bot.users.cache.size}\``, inline: true },
            { name: '➳ Edition', value: '`1.0.0`', inline: true },
            { name: '➳ Copies', value: `\`${bot.guilds.cache.size}\``, inline: true },
            { name: '➳ Parts', value: `\`${bot.commands.size}\``, inline: true},
            { name: '➳ Pong', value: `\`${bot.ws.ping}ms\``, inline: true},
            { name: '➳ Clock', value: `\`${londonDate}\``, inline: true}
        )
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.config.embedColor)
        .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });

        await interaction.reply({ allowedMentions: { repliedUser: false }, embeds: [infoEmbed] });
    },
};