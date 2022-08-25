const { readdirSync } = require("fs");
const { DateTime } = require("luxon")
const { QuickDB } = require('quick.db');
const db = new QuickDB();
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

        let serverNum = bot.guilds.cache.size
        let userNum = bot.users.cache.size
        let commandNum = bot.commands.size

        let totalCommandCountBot = await db.get(`global_commands`)

        if (totalCommandCountBot === null) totalCommandCountBot = 1

        const formatServerNum = serverNum => {
            if (serverNum < 1e3) return serverNum;
            if (serverNum >= 1e3 && serverNum < 1e6) return +(serverNum / 1e3).toFixed(1) + "K";
            if (serverNum >= 1e6 && serverNum < 1e9) return +(serverNum / 1e6).toFixed(1) + "M";
            if (serverNum >= 1e9 && serverNum < 1e12) return +(serverNum / 1e9).toFixed(1) + "B";
            if (serverNum >= 1e12) return + (serverNum / 1e12).toFixed(1) + "T";
        };

        const formatUserNum = userNum => {
            if (userNum < 1e3) return userNum;
            if (userNum >= 1e3 && userNum < 1e6) return +(userNum / 1e3).toFixed(1) + "K";
            if (userNum >= 1e6 && userNum < 1e9) return +(userNum / 1e6).toFixed(1) + "M";
            if (userNum >= 1e9 && userNum < 1e12) return +(userNum / 1e9).toFixed(1) + "B";
            if (userNum >= 1e12) return + (userNum / 1e12).toFixed(1) + "T";
        };

        const formatCommandNum = commandNum => {
            if (commandNum < 1e3) return commandNum;
            if (commandNum >= 1e3 && commandNum < 1e6) return +(commandNum / 1e3).toFixed(1) + "K";
            if (commandNum >= 1e6 && commandNum < 1e9) return +(commandNum / 1e6).toFixed(1) + "M";
            if (commandNum >= 1e9 && commandNum < 1e12) return +(commandNum / 1e9).toFixed(1) + "B";
            if (commandNum >= 1e12) return + (commandNum / 1e12).toFixed(1) + "T";
        };

        const formatTotalCommandCountBot = totalCommandCountBot => {
            if (totalCommandCountBot < 1e3) return totalCommandCountBot;
            if (totalCommandCountBot >= 1e3 && totalCommandCountBot < 1e6) return +(totalCommandCountBot / 1e3).toFixed(1) + "K";
            if (totalCommandCountBot >= 1e6 && totalCommandCountBot < 1e9) return +(totalCommandCountBot / 1e6).toFixed(1) + "M";
            if (totalCommandCountBot >= 1e9 && totalCommandCountBot < 1e12) return +(totalCommandCountBot / 1e9).toFixed(1) + "B";
            if (totalCommandCountBot >= 1e12) return + (totalCommandCountBot / 1e12).toFixed(1) + "T";
        };

        let infoEmbed = new bot.discord.MessageEmbed()
        .setAuthor({ name: `◠ Information ◡`, iconURL: bot.user.displayAvatarURL() })
        .setDescription('∘∘∘ Beep Boop. I am the droid version of sir noah ∘∘∘')
        .addFields(
            { name: '➳ Assembled', value: '`15th Dec 2021`', inline: true },
            { name: '➳ Master', value: '`Noah💙#6336`', inline: true },
            { name: '➳ Lived For', value: `\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\``, inline: true },
            { name: '➳ Workers', value: `\`${formatUserNum(userNum)}\``, inline: true },
            { name: '➳ Edition', value: '`1.0.0`', inline: true },
            { name: '➳ Copies', value: `\`${formatServerNum(serverNum)}\``, inline: true },
            { name: '➳ Parts', value: `\`${formatCommandNum(commandNum)}\``, inline: true},
            { name: '➳ Total Parts', value: `\`${formatTotalCommandCountBot(totalCommandCountBot)}\``, inline: true},
            { name: '➳ Pong', value: `\`${bot.ws.ping}ms\``, inline: true},
            { name: '➳ Clock', value: `\`${londonDate}\`` + " " + `\`${londonTime}\`` + " " + `\`${londonShort}\``, inline: true}
        )
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.config.embedColor)
        .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });

        let cooldown = 10000
    	let a = await message.guild.members.fetch(message.author)
    	let giver = await getInfoCooldown(message.guild.id, a.id)
    	
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
            setInfoCooldown(message.guild.id, a.id, Date.now())
        }

    }
}

//     	if (message.content.startsWith(prefixes)) {
//		db.add(`commands_${message.author.id}`, 1); //amount a user ran
//		db.add(`global_commands`, 1); //amount evrryonr on the bot ran altogether
