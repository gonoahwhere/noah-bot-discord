const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = require("discord-images");
const { getBonkCooldown, setBonkCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'bonk',
    usage: 'n.bonk <user>',
    aliases: ["whack", "thump"],
    category: 'Fun',
    description: 'Give someone a bonk.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = anime.bonk()
    	let cooldown = 10000
    	
    	let giver = await getBonkCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`bonk\`.`)
    	} else if (!args[0]) {
    		message.reply("you need to mention who you want to bonk, bruh")
    		setBonkCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === null) {
    		message.reply("that ain't a valid person, mention a real human bruh.")
    		setBonkCooldown(message.guild.id, a.id, Date.now())
    	} else if (c.bot) {
    		message.reply("you cannot bonk a piece of metal, idiot.")
    		setBonkCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === message.author) {
    		message.reply("you cannot bonk yourself, loser.")
    		setBonkCooldown(message.guild.id, a.id, Date.now())
    	} else {
    		const embed = new bot.discord.MessageEmbed()
    			.setAuthor({ name: `◠ Bonk ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${b.displayName} has been bonked by ${a.displayName} ∘∘∘`)
    			.setImage(image)
    			.setColor(bot.config.embedColor)
       			.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       		setBonkCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}