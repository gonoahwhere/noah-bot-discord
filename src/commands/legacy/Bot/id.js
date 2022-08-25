module.exports = {
    name: 'id',
    usage: 'n.info',
    category: 'Bot',
    description: 'Get your ID.',
    ownerOnly: false,
    run: async(bot, message, args) => {
      
      let data = message.author.id;
      let buff = new Buffer(data);
      let base64data = buff.toString('base64');
      
      let id = message.author.id;
      
      message.channel.send("eastside." + base64data)
      
    }
  }