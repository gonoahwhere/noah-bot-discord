const { readdirSync } = require("fs");
const { getHelpSlashCooldown, setHelpSlashCooldown } = require("../../../utils/functions.js")
// Example of how to make a Help SlashCommand

module.exports = {
    name: "help",
    usage: '/help <command>',
    options: [
        {
            name: 'command',
            description: 'What command do you need help',
            type: 'STRING',
            required: false
        }
    ],
    category: "Bot",
    description: "Return all commands, or one specific command!",
    ownerOnly: false,
    run: async (bot, interaction) => {

        // Buttons that take you to a link
        // If you want to delete them, remove this part of
        // the code and in line: 62 delete ", components: [row]"
        const row = new bot.discord.MessageActionRow()
            .addComponents(
                new bot.discord.MessageButton()
                    .setLabel("GitHub")
                    .setStyle("LINK")
                    .setURL("http://github.com/gonoahwhere/noah-bot-discord")
            );

        const commandInt = interaction.options.getString("command");
        
        
        let helpSlashCooldown = await getHelpSlashCooldown(interaction.guild?.id, interaction.author?.id);
        let cooldown = 10000
        
        if (helpSlashCooldown !== null && cooldown - (Date.now() - helpSlashCooldown) > 0) {
          let times = cooldown - (Date.now() - helpSlashCooldown)
          var duration = Math.trunc(times/1000)
          var secs = duration%60
          var duration = Math.trunc(duration/60)
          var mins = duration%60
          var duration = Math.trunc(duration/60)
          var hrs = duration%60
          
          let remaining = (hrs+"h "+mins+"m "+secs+"s")
          let msgReply = `Wait **${remaining}** before using \`/help\`.`
          await interaction.reply(msgReply)
        } else if (!commandInt) {

            // Get the commands of a Bot category
            const botCommandsList = [];
            readdirSync(`${bot.cwd}/src/commands/slash/Bot`).forEach((file) => {
                const filen = require(`${bot.cwd}/src/commands/slash/Bot/${file}`);
                const name = `\`${filen.name}\``;
                botCommandsList.push(name);
            });

            // This is what it commands when using the command without arguments
            const helpEmbed = new bot.discord.MessageEmbed()
                .setAuthor({ name: `◠ Mechanic Centre [${bot.commands.size}] ◡`, iconURL: bot.user.displayAvatarURL()})
                .setDescription(`∘∘∘ Beep Boop. Droid of sir noah at your service. How may I help you? ∘∘∘`)
                .addFields(
                    { name: '➳ Bot Parts', value: botCommandsList.map((data) => `${data}`).join(", "), inline: true }
                )
                .setColor(bot.config.embedColor)
                .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });
            
            interaction.reply({ embeds: [helpEmbed], components: [row] });
            setHelpSlashCooldown(interaction.guild?.id, interaction.author?.id, Date.now())
        } else {
            const command = bot.slash.get(commandInt.toLowerCase());

            if (!command) {
                interaction.reply({ content: `There isnt a slash command named "${commandInt}"` });
                setHelpSlashCooldown(interaction.guild?.id, interaction.author?.id, Date.now())
            } else {

                let command = bot.slash.get(commandInt.toLowerCase());
                let name = command.name;
                let description = command.description || "No descrpition provided"
                let usage = command.usage || "No usage provided"
                let category = command.category || "No category provided!"

                let helpCmdEmbed = new bot.discord.MessageEmbed()
                    .setAuthor({ name: `${bot.user.username} Help | \`${(name.toLocaleString())}\` Slash Command`, iconURL: bot.user.displayAvatarURL()})
                    .addFields(
                        { name: "Description", value: `${description}` },
                        { name: "Usage", value: `${usage}` },
                        { name: 'Category', value: `${category}` })
                    .setColor(bot.config.embedColor)
                    .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });

                interaction.reply({ embeds: [helpCmdEmbed] });
                setHelpSlashCooldown(interaction.guild?.id, interaction.author?.id, Date.now())
            }
        }
    },
};