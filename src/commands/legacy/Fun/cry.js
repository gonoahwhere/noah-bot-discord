const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = require("discord-images");
const { getCryCooldown, setCryCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'cry',
    usage: 'n.cry <user>',
    aliases: ["upset"],
    category: 'Fun',
    description: 'Start crying.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = await anime.cry()
    	let cooldown = 10000
    	
    	let giver = await getCryCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`cry\`.`)
    	} else {
    		const embed = new bot.discord.MessageEmbed()
    			.setAuthor({ name: `◠ Cry ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${a.displayName} is crying ∘∘∘`)
    			.setImage(image)
    			.setColor(bot.config.embedColor)
       			.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       		setCryCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}