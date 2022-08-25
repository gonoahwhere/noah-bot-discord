const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = require("discord-images");
const { getPatCooldown, setPatCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'pat',
    usage: 'n.pat <user>',
    aliases: ["pet", "stroke"],
    category: 'Fun',
    description: 'Give someone a pat.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = anime.pat()
    	let cooldown = 10000
    	
    	let giver = await getPatCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`pat\`.`)
    	} else if (!args[0]) {
    		message.reply("you need to mention who you want to pat, bruh")
    		setPatCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === null) {
    		message.reply("that ain't a valid person, mention a real human bruh.")
    		setPatCooldown(message.guild.id, a.id, Date.now())
    	} else if (c.bot) {
    		message.reply("you cannot pat a piece of metal, idiot.")
    		setPatCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === message.author) {
    		message.reply("you cannot pat yourself, loser.")
    		setPatCooldown(message.guild.id, a.id, Date.now())
    	} else {
   			const embed = new bot.discord.MessageEmbed()
				.setAuthor({ name: `◠ Pat ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${b.displayName} has been patted by ${a.displayName} ∘∘∘`)
    			.setImage(image)
    		    .setColor(bot.config.embedColor)
       			.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       		setPatCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}