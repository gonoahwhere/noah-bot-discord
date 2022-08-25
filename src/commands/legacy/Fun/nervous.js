const emotes = require("discord-emotes")
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = await ("discord-images");
const { getNervousCooldown, setNervousCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'nervous',
    usage: 'n.nervous <user>',
    aliases: ["anxiety"],
    category: 'Fun',
    description: 'Feeling nervous.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	
    	let cooldown = 10000
    	
    	let giver = await getNervousCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`nervous\`.`)
    	} else {
    		emotes.nervous().then(nervous => {
    			const embed = new bot.discord.MessageEmbed()
    				.setAuthor({ name: `◠ Nervous ◡`, iconURL: bot.user.displayAvatarURL() })
    				.setDescription(`∘∘∘ ${a.displayName} is feeling nervous ∘∘∘`)
    				.setImage(nervous)
    			    .setColor(bot.config.embedColor)
       				.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
				message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       			setNervousCooldown(message.guild.id, a.id, Date.now())
            })
    	}
    }
}