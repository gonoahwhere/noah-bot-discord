const { Database } = require("mongoose");
const db = new Database(process.env.MongoURI);
const anime = require("discord-images");
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
    	const image = await anime.nervous()
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
    		
    		let remaining = (secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`nervous\`.`)
    	} else {
    		const embed = new bot.discord.MessageEmbed()
    			.setAuthor({ name: `◠ Nervous ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${a.displayName} is feeling nervous ∘∘∘`)
    			.setImage(image)
			    .setColor(bot.config.embedColor)
   				.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       		setNervousCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}