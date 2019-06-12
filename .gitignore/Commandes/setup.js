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
            description: description
        }});
    }

    send(message, `Ceci est un test`)



};

module.exports.help = {
    name: "setup"
}