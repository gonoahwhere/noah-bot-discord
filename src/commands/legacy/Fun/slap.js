const emotes = require("discord-emotes")
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = await ("discord-images");
const { getSlapCooldown, setSlapCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'slap',
    usage: 'n.slap <user>',
    aliases: ["thwack", "strike"],
    category: 'Fun',
    description: 'Give someone a slap.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	
    	let cooldown = 10000
    	
    	let giver = await getSlapCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`slap\`.`)
    	} else if (!args[0]) {
    		message.reply("you need to mention who you want to slap, bruh")
    		setSlapCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === null) {
    		message.reply("that ain't a valid person, mention a real human bruh.")
    		setSlapCooldown(message.guild.id, a.id, Date.now())
    	} else if (c.bot) {
    		message.reply("you cannot slap a piece of metal, idiot.")
    		setSlapCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === message.author) {
    		message.reply("you cannot slap yourself, loser.")
    		setSlapCooldown(message.guild.id, a.id, Date.now())
    	} else {
    		emotes.slap().then(slap => {
    			const embed = new bot.discord.MessageEmbed()
    				.setAuthor({ name: `◠ Slap ◡`, iconURL: bot.user.displayAvatarURL() })
    				.setDescription(`∘∘∘ ${b.displayName} has been slapped by ${a.displayName} ∘∘∘`)
    				.setImage(slap)
    			    .setColor(bot.config.embedColor)
       				.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
				message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       			setSlapCooldown(message.guild.id, a.id, Date.now())
            })
    	}
    }
}