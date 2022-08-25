const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = require("discord-images");
const { getConfusedCooldown, setConfusedCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'confused',
    usage: 'n.confused <user>',
    aliases: ["unclear"],
    category: 'Fun',
    description: 'Feeling confused.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = anime.confused()
    	let cooldown = 10000
    	
    	let giver = await getConfusedCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`confused\`.`)
    	} else {
    		const embed = new bot.discord.MessageEmbed()
    			.setAuthor({ name: `◠ Confused ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${a.displayName} is feeling confused ∘∘∘`)
    			.setImage(image)
    			.setColor(bot.config.embedColor)
       			.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       		setConfusedCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}