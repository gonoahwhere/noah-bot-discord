const emotes = require("discord-emotes")
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { getHappyCooldown, setHappyCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'happy',
    usage: 'n.happy <user>',
    aliases: ["cheerful"],
    category: 'Fun',
    description: 'Feeling happy.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	
    	let cooldown = 10000
    	
    	let giver = await getHappyCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`happy\`.`)
    	} else {
    		emotes.happy().then(happy => {
    			const embed = new bot.discord.MessageEmbed()
    				.setAuthor({ name: `◠ Happy ◡`, iconURL: bot.user.displayAvatarURL() })
    				.setDescription(`∘∘∘ ${a.displayName} is feeling happy ∘∘∘`)
    				.setImage(happy)
    			    .setColor(bot.config.embedColor)
       				.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
				message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       			setHappyCooldown(message.guild.id, a.id, Date.now())
            })
    	}
    }
}