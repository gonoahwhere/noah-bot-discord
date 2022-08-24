const { readdirSync } = require("fs");
const { getHelpCooldown, setHelpCooldown } = require("../../../utils/functions.js")

// Example of how to make a Help Command

module.exports = {
    name: "help",
    aliases: ["h", "commands"],
    usage: 'n.help <command>',
    category: "Bot",
    description: "Return all commands, or one specific command!",
    ownerOnly: false,

    run: async (bot, message, args) => {

        // Buttons that take you to a link
        // If you want to delete them, remove this part of
        // the code and in line: 55 delete ", components: [row]"
        const row = new bot.discord.MessageActionRow().addComponents(
            new bot.discord.MessageButton()
                .setLabel("GitHub")
                .setStyle("LINK")
                .setURL("http://github.com/gonoahwhere/noah-bot-discord")
        );

        let cooldown = 10000
    	
        let a = await message.guild.members.fetch(message.author)
    	let giver = await getHelpCooldown(message.guild.id, a.id)
    	
    	if (giver !== null && cooldown - (Date.now() - giver) > 0 ) {
    		let times = cooldown - (Date.now() - giver)
    		var duration = Math.trunc(times/1000)
    		var secs = duration%60
    		duration = Math.trunc(duration/60)
    		var mins = duration%60
    		duration = Math.trunc(duration/60)
    		var hrs = duration%60
    		
    		let remaining = (hrs+"h "+mins+"m "+secs+"s")
    		
    		message.channel.send(`${a.displayName}, wait **${remaining}** before using \`help\`.`)
        } else if (!args[0]) {

            // Get the commands of a Bot category
            const botCommandsList = [];
            readdirSync(`${bot.cwd}/src/commands/legacy/Bot`).forEach((file) => {
                const filen = require(`${bot.cwd}/src/commands/legacy/Bot/${file}`);
                const name = `\`${filen.name}\``;
                botCommandsList.push(name);
            });

            // Get the commands of a Fun category
            const funCommandsList = [];
            readdirSync(`${bot.cwd}/src/commands/legacy/Fun`).forEach((file) => {
                const filen = require(`${bot.cwd}/src/commands/legacy/Fun/${file}`);
                const name = `\`${filen.name}\``;
                funCommandsList.push(name);
            });

            // This is what it commands when using the command without arguments
            const helpEmbed = new bot.discord.MessageEmbed()
            .setAuthor({ name: `◠ Mechanic Centre [${bot.commands.size}] ◡`, iconURL: bot.user.displayAvatarURL()})
                .setDescription(`∘∘∘ Beep Boop. Droid of sir noah at your service. How may I help you? ∘∘∘`)
                .addFields(
                    { name: '➳ Bot Parts', value: botCommandsList.map((data) => `${data}`).join(", "), inline: true },
                    { name: '➳ Fun Parts', value: funCommandsList.map((data) => `${data}`).join(", "), inline: true }
                )
                .setColor(bot.config.embedColor)
                .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });

            message.reply({ allowedMentions: { repliedUser: false }, embeds: [helpEmbed], components: [row] });
            setHelpCooldown(message.guild.id, a.id, Date.now())
        } else {
            const command = bot.commands.get(args[0].toLowerCase()) || bot.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));

            // This is what it sends when using the command with argument and it does not find the command
            if (!command) {
                message.reply({ content: `There isn't any command named "${args[0]}"`, allowedMentions: { repliedUser: false } });
                setHelpCooldown(message.guild.id, a.id, Date.now())
            } else {

                // This is what it sends when using the command with argument and if it finds the command
                let command = bot.commands.get(args[0].toLowerCase()) || bot.commands.find((c) => c.aliases && c.aliases.includes(args[0].toLowerCase()));
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let aliases = command.aliases || "No aliases provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new bot.discord.MessageEmbed()
                    .setAuthor({ name: `${bot.user.username} Help | \`${(name.toLocaleString())}\` Command`, iconURL: bot.user.displayAvatarURL()})
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: "Aliases", value: `${aliases}` },
                        { name: 'Category', value: `${category}` })
                    .setColor(bot.config.embedColor)
                    .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });

                message.reply({ allowedMentions: { repliedUser: false }, embeds: [helpCmdEmbed] });
                setHelpCooldown(message.guild.id, a.id, Date.now())
            }
        }
    },
};