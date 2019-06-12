const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    function sendError(message, description) {
        message.channel.send({embed: {
            color: 0xe43333,
            description: ':x: ' + description
        }});
    }

    function send(message, description) {
        message.channel.send({embed: {
            color: 0x188a02,
            description: ':mobile_phone_off: '+ description
        }});
    }

    if(message.author.id != "394117327320383492") return sendError(message, `Seul **Balafre78** peut stop le Bot !`)

    try {
        process.exit()
        send(message, `Le **Bot** c'est éteint !`)
    } catch(e) {
        sendError(message, `ERREUR : **${e.message}**`)
    }


};

module.exports.help = {
    name: "botstop"
}