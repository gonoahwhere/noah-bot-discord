const emotes = require("discord-emotes")
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = require("discord-images");
const { getYeetCooldown, setYeetCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'yeet',
    usage: 'n.yeet <user>',
    aliases: ["yeet", "delete"],
    category: 'Fun',
    description: 'Give someone a yeet.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = anime.yeet()
    	let cooldown = 10000
    	
    	let giver = await getYeetCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`yeet\`.`)
    	} else if (!args[0]) {
    		message.reply("you need to mention who you want to yeet, bruh")
    		setYeetCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === null) {
    		message.reply("that ain't a valid person, mention a real human bruh.")
    		setYeetCooldown(message.guild.id, a.id, Date.now())
    	} else if (c.bot) {
    		message.reply("you cannot yeet a piece of metal, idiot.")
    		setYeetCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === message.author) {
    		message.reply("you cannot yeet yourself, loser.")
    		setYeetCooldown(message.guild.id, a.id, Date.now())
    	} else {
    		const embed = new bot.discord.MessageEmbed()
				.setAuthor({ name: `◠ Yeet ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${b.displayName} has been yeeted by ${a.displayName} ∘∘∘`)
    			.setImage(image)
    		    .setColor(bot.config.embedColor)
       			.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       		setYeetCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}