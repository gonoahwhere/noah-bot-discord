const { readdirSync } = require("fs");
const { DateTime } = require("luxon")
const { getInfoCooldown, setInfoCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'info',
    usage: 'n.info',
    aliases: ["bi", "botinfo"],
    category: 'Bot',
    description: 'Learn more about my mechanics.',
    ownerOnly: false,
    run: async(bot, message, args) => {

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

        //timeZoneName: 'short'
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

        let cooldown = 10000
    	let a = await message.guild.members.fetch(message.author)
    	let giver = await getInfoCooldown(message.guild.id, message.author.id)
    	
    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`info\`.`)
        } else {
            message.reply({ allowedMentions: { repliedUser: false }, embeds: [infoEmbed] });
            setInfoCooldown(message.guild.id, message.author.id, Date.now())
        }

    }
}