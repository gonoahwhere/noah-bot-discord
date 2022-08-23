module.exports = {
    name: 'guildMemberAdd',

    async execute(member, bot) {
        const { guild } = member;
        console.log(`${member.username} join guilds ${guild.name}`);
    }
}