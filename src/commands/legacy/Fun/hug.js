const emotes = require("discord-emotes")
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { getHugCooldown, setHugCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'hug',
    usage: 'n.hug <user>',
    aliases: ["hold", "embrace"],
    category: 'Fun',
    description: 'Give someone a hug.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	
    	let cooldown = 10000
    	
    	let giver = await getHugCooldown(message.guild.id, a.id)
    	
    	if (message.author.id === "372456601266683914") {
    		cooldown = 0
    	}
    	
    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`hug\`.`)
    	} else if (!args[0]) {
    		return message.reply("you need to mention who you want to hug, bruh")
    		setHugCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === null) {
    		return message.reply("that ain't a valid person, mention a real human bruh.")
    		setHugCooldown(message.guild.id, a.id, Date.now())
    	} else if (c.bot) {
    		return message.reply("you cannot hug a piece of metal, idiot.")
    		setHugCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === message.author) {
    		return message.reply("you cannot hug yourself, loser.")
    		setHugCooldown(message.guild.id, a.id, Date.now())
    	} else {
    		emotes.hug().then(hug => {
    			const embed = new bot.discord.MessageEmbed()
    				.setAuthor({ name: `◠ Hug ◡`, iconURL: bot.user.displayAvatarURL() })
    				.setDescription(`∘∘∘ ${a.displayName} hugged ${b.displayName} ∘∘∘`)
    				.setImage(hug)
    			    .setColor(bot.config.embedColor)
       				.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
				message.reply({ allowedMentions: { repliedUser: false }, embeds: [infoEmbed] });
       			setHugCooldown(message.guild.id, a.id, Date.now())
            })
    	}
    }
}