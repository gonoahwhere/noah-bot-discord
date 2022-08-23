const { DateTime } = require('luxon');


module.exports = {
    name: "info",
    category: "Bot",
    description: "Learn more about my mechanics.",
    ownerOnly: false,
    run: async (bot, interaction) => {
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        /*function localDate() {
        
            let local = DateTime.local(); //initialize luxon Date-Object
            let rezonedString = local.setZone("Europe/London").toString(); //set timezone of Date-Object and convert to string
            var dateString = rezonedString.slice(0, -10) + "z"; //trim string to create default JavaScript Date-OBject
            var today = new Date(dateString); //convert dateString to JS Date-Object
        
            //fix Month index
            today.setMonth(today.getMonth() + 1);
            return today;
        
        }
        
        //set variable today to localDate in NZ
        var today = localDate();*/
        
        var local = DateTime.local();
        var rezoned = local.setZone("Pacific/Auckland");
        let infoEmbed = new bot.discord.MessageEmbed()
        .setAuthor({ name: `◠ Information ◡`, iconURL: bot.user.displayAvatarURL() })
        .setDescription('∘∘∘ Beep Boop. I am the droid version of sir noah ∘∘∘')
        .addFields(
            { name: '➳ Assembled', value: '`15th Dec 2021`', inline: true },
            { name: '➳ Master', value: '`Noah💙#6336`', inline: true },
            { name: '➳ Lived For', value: `\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\``, inline: true },
            { name: '➳ Workers', value: `\`${bot.users.cache.size}\``, inline: true },
            { name: '➳ Edition', value: '`1.0.0`', inline: true },
            { name: '➳ Copies', value: `\`${bot.guilds.cache.size}\``, inline: true },
            { name: '➳ Parts', value: `\`${bot.commands.size}\``, inline: true},
            { name: '➳ Pong', value: `\`${bot.ws.ping}ms\``, inline: true},
            { name: '➳ Clock', value: `\`${local}\``, inline: true}
        )
        .setThumbnail(bot.user.displayAvatarURL())
        .setColor(bot.config.embedColor)
        .setFooter({ text: `${bot.config.embedfooterText}`, iconURL: `${bot.user.displayAvatarURL()}` });

        await interaction.reply({ allowedMentions: { repliedUser: false }, embeds: [infoEmbed] });
    },
};