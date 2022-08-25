const { QuickDB } = require('quick.db');
const db = new QuickDB();
const anime = require("discord-images");
const { getWinkCooldown, setWinkCooldown } = require("../../../utils/functions.js")

module.exports = {
    name: 'wink',
    usage: 'n.wink <user>',
    aliases: ["blink", "bat"],
    category: 'Fun',
    description: 'Give someone a wink.',
    ownerOnly: false,
    run: async(bot, message, args) => {
    	
    	let a = await message.guild.members.fetch(message.author)
    	let b = await message.guild.members.fetch(message.mentions.users.first())
    	let c = message.mentions.users.first()
    	const image = await anime.wink()
    	let cooldown = 10000
    	
    	let giver = await getWinkCooldown(message.guild.id, a.id)

    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`wink\`.`)
    	} else if (!args[0]) {
    		message.reply("you need to mention who you want to wink, bruh")
    		setWinkCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === null) {
    		message.reply("that ain't a valid person, mention a real human bruh.")
    		setWinkCooldown(message.guild.id, a.id, Date.now())
    	} else if (c.bot) {
    		message.reply("you cannot wink a piece of metal, idiot.")
    		setWinkCooldown(message.guild.id, a.id, Date.now())
    	} else if (args[0] === message.author) {
    		message.reply("you cannot wink yourself, loser.")
    		setWinkCooldown(message.guild.id, a.id, Date.now())
    	} else {
    		const embed = new bot.discord.MessageEmbed()
    			.setAuthor({ name: `◠ Wink ◡`, iconURL: bot.user.displayAvatarURL() })
    			.setDescription(`∘∘∘ ${b.displayName} has been winked at by ${a.displayName} ∘∘∘`)
    			.setImage(image)
    			.setColor(bot.config.embedColor)
       			.setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` })
       				
			message.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] });
       		setWinkCooldown(message.guild.id, a.id, Date.now())
    	}
    }
}