module.exports = {
    name: 'ready',
    once: true,

    async execute(bot) {
        
        // Puts an activity
    const statuses = [
      `Noah`,
      `YouTube`,
      `I Don't Even Know`,
      `Skateboarding`,
      `Noahs Wife`,
      `Noahs Chaos`,
      `aaaaa`
    ];

    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, { type: "STREAMING", url: 'https://www.twitch.tv/tootrueforyoumoo' });
    }, 60000);
        
        // Send a message on the console
        console.log(`[LOG] ${bot.user.tag} is now online!`);
        console.log(`[LOG] ${bot.user.tag} is now ready to serve in ${bot.guilds.cache.size} servers`);
        console.log(`[LOG] ${bot.user.tag} is now serving ${bot.users.cache.size} users`);
    }
}