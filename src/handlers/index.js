

const fs    = require("fs");
const chalk = require("chalk");

/**
 * Load Events
 */
const loadEvents = async function (bot) {
    const eventFolders = fs.readdirSync(`${bot.cwd}/src/events`);
    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(`${bot.cwd}/src/events/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of eventFiles) {
            const event = require(`${bot.cwd}/src/events/${folder}/${file}`);
            
            if (event.name) {
                console.log(chalk.bgBlueBright.black(` ✔️ => Event ${file} is being loaded `));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Event ${file} missing a help.name or help.name is not in string `));
                continue;
            }
            
            if (event.once) {
                bot.once(event.name, (...args) => event.execute(...args, bot));
            } else {
                bot.on(event.name, (...args) => event.execute(...args, bot));
            }
        }
    }
}

/**
 * Load Prefix Commands
 */
const loadCommands = async function (bot) {
    const commandFolders = fs.readdirSync(`${bot.cwd}/src/commands/legacy/`);
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${bot.cwd}/src/commands/legacy/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`${bot.cwd}/src/commands/legacy/${folder}/${file}`);
            
            if (command.name) {
                bot.commands.set(command.name, command);
                console.log(chalk.bgBlueBright.black(` ✔️ => Prefix Command ${file} is being loaded `));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => Prefix Command ${file} missing a help.name or help.name is not in string `));
                continue;
            }
            
            if (command.aliases && Array.isArray(command))
                command.aliases.forEach((alias) => bot.aliases.set(alias, command.name));
        }
    }
}

/**
 * Load SlashCommands
 */
const loadSlashCommands = async function (bot) {
    let slash = [];

    const commandFolders = fs.readdirSync(`${bot.cwd}/src/commands/slash`);
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`${bot.cwd}/src/commands/slash/${folder}`)
            .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`${bot.cwd}/src/commands/slash/${folder}/${file}`);
            
            if (command.name) {
                bot.slash.set(command.name, command);
                slash.push(command)
                console.log(chalk.bgBlueBright.black(` ✔️ => SlashCommand ${file} is being loaded `));
            } else {
                console.log(chalk.bgRedBright.black(` ❌ => SlashCommand ${file} missing a help.name or help.name is not in string `));
                continue;
            }
        }
    }

    bot.on("ready", async() => {
        // Register Slash Commands for a single guild
        // await bot.guilds.cache
        //    .get("YOUR_GUILD_ID")
        //    .commands.set(slash);

        console.log('Deleted Slash Commands for all the guilds.');
        //await bot.application.commands.set(slash)
        bot.application.commands.set([])

    })
}

module.exports = {
    loadEvents,
    loadCommands,
    loadSlashCommands
}