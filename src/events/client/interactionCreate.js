

module.exports = {
    name: 'interactionCreate',

    async execute(interaction, bot) {
        if (!interaction.isCommand()) return;
        
        const command = bot.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'There was an error while attempting to process this command.' });
        
        if (command.ownerOnly) {
            if (interaction.user.id !== bot.config.ownerID) {
                return interaction.reply({ ephemeral: true, content: "This command only for Bot Owner!" });
            }
        }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(bot, interaction, args);
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
}