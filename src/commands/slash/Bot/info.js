const { getInfoSlashCooldown, setInfoSlashCooldown } = require("../../../utils/functions.js")
const { DateTime } = require("luxon")

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
        let londonDate = date.toLocaleDateString('en-GB', { timeZone: 'Europe/London'})
        let londonTime = date.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hourCycle: 'h23'})
        var local = DateTime.local();
        var rezoned = local.setZone("Europe/London");
        let londonShortTZ = rezoned.toLocaleString({timeZoneName: 'short'})
        let londonShort = londonShortTZ.substr(11,16);
          
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
            { name: '➳ Clock', value: `\`${londonDate}\`` + " " + `\`${londonTime}\`` + " " + `\`${londonShort}\``, inline: true}
        )
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.config.embedColor)
        .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });
        
        let infoSlashCooldown = await getInfoSlashCooldown(interaction.guild?.id, interaction.author?.id);
        let cooldown = 10000

        if (infoSlashCooldown !== null && cooldown - (Date.now() - infoSlashCooldown) > 0) {
            let times = cooldown - (Date.now() - infoSlashCooldown)
            var duration = Math.trunc(times/1000)
            var secs = duration%60
            var duration = Math.trunc(duration/60)
            var mins = duration%60
            var duration = Math.trunc(duration/60)
            var hrs = duration%60
            
            let remaining = (hrs+"h "+mins+"m "+secs+"s")
            let msgReply = `Wait **${remaining}** before using \`/info\`.`
            await interaction.reply(msgReply)
        } else {
            await interaction.reply({ allowedMentions: { repliedUser: false }, embeds: [infoEmbed] });
            setInfoSlashCooldown(interaction.guild?.id, interaction.author?.id, Date.now())
        }
    },
};