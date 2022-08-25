const emotes = require("discord-emotes")
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = await ("discord-images");
const { getKickCooldown, setKickCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'kick',
    usage: 'n.kick <user>',
    aliases: ["foot", "boot"],
    category: 'Fun',
    description: 'Give someone a kick.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = anime.kick()
    	let cooldown = 10000
    	
    	let giver = await getKickCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`kick\`.`)
    	} else if (!args[0]) {
    		message.reply("you need to mention who you want to kick, bruh")
    		setKickCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === null) {
    		message.reply("that ain't a valid person, mention a real human bruh.")
    		setKickCooldown(message.guild.id, a.id, Date.now())
    	} else if (c.bot) {
    		message.reply("you cannot kick a piece of metal, idiot.")
    		setKickCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === message.author) {
    		message.reply("you cannot kick yourself, loser.")
    		setKickCooldown(message.guild.id, a.id, Date.now())
    	} else {
    		const embed = new bot.discord.MessageEmbed()
    			.setAuthor({ name: `◠ Kick ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${b.displayName} has been kicked by ${a.displayName} ∘∘∘`)
    			.setImage(image)
    			.setColor(bot.config.embedColor)
       			.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
    		setKickCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}