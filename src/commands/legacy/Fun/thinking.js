const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = require("discord-images");
const { getThinkingCooldown, setThinkingCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'thinking',
    usage: 'n.thinking <user>',
    aliases: ["thoughts"],
    category: 'Fun',
    description: 'Start thinking.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = await anime.thinking()
    	let cooldown = 10000
    	
    	let giver = await getThinkingCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`thinking\`.`)
    	} else {
   			const embed = new bot.discord.MessageEmbed()
   				.setAuthor({ name: `◠ Thinking ◡`, iconURL: bot.user.displayAvatarURL() })
   				.setDescription(`∘∘∘ ${a.displayName} is thinking ∘∘∘`)
   				.setImage(image)
  			    .setColor(bot.config.embedColor)
   				.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
   			setThinkingCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}