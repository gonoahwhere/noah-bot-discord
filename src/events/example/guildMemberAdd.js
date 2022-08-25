module.exports = {
    name: 'guildMemberAdd',

    async execute(member, bot) {
        const { guild } = member;
        console.log(`${member.tag} join guilds ${guild.name}`);
    }
}