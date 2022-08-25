const { Database } = require("quickmongo");
const db = new Database(process.env.MongoURI);
const anime = require("discord-images");
const { getScreamCooldown, setScreamCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'scream',
    usage: 'n.scream <user>',
    aliases: ["shout", "loud"],
    category: 'Fun',
    description: 'Give someone a scream.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = await anime.scream()
    	let cooldown = 10000
    	
    	let giver = await getScreamCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`scream\`.`)
    	} else if (!args[0]) {
    		message.reply("you need to mention who you want to scream, bruh")
    		setScreamCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === null) {
    		message.reply("that ain't a valid person, mention a real human bruh.")
    		setScreamCooldown(message.guild.id, a.id, Date.now())
    	} else if (c.bot) {
    		message.reply("you cannot scream a piece of metal, idiot.")
    		setScreamCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === message.author) {
    		message.reply("you cannot scream yourself, loser.")
    		setScreamCooldown(message.guild.id, a.id, Date.now())
    	} else {
    		const embed = new bot.discord.MessageEmbed()
    			.setAuthor({ name: `◠ Scream ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${b.displayName} has been screamed at by ${a.displayName} ∘∘∘`)
				.setImage(image)
   			    .setColor(bot.config.embedColor)
   				.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
   			setScreamCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}