const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = require("discord-images");
const { getSadCooldown, setSadCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'sad',
    usage: 'n.sad <user>',
    aliases: ["unhappy"],
    category: 'Fun',
    description: 'Feeling sad.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = await anime.sad()
    	let cooldown = 10000
    	
    	let giver = await getSadCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`sad\`.`)
    	} else {
   			const embed = new bot.discord.MessageEmbed()
   				.setAuthor({ name: `◠ Sad ◡`, iconURL: bot.user.displayAvatarURL() })
   				.setDescription(`∘∘∘ ${a.displayName} is feeling sad ∘∘∘`)
   				.setImage(image)
   			    .setColor(bot.config.embedColor)
   				.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
   			setSadCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}