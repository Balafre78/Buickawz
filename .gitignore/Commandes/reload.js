const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    function sendError(message, description) {
        message.channel.send({embed: {
            color: '15158332',
            description: ':x: ' + description
        }});
    
    }

    function send(message, description) {
        message.channel.send({embed: {
            color: 0xAAFFFF,
            description: description
        }});
    }

    if(message.author.id != "394117327320383492") return sendError(message, `Seul **Balafre78** peut reload !`)

    if(!args[0]) return sendError(message, `Merci de donner une commande à reload !`)

    let commandName = args[0].toLowerCase()
    
    try {
        delete require.cache[require.resolve(`./${commandName}.js`)]
        client.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        client.commands.set(commandName, pull)

    } catch(e) {
        sendError(message, `Je ne peux pas reload : \`${args[0].toUpperCase()}\``)
    }
    
    send(message, `La commande \`${args[0].toUpperCase()}\` à été reload !`)
};


module.exports.help = {
    name: "reload"
}