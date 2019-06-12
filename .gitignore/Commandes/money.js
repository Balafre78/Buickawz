const Discord = require("discord.js");

var eco = require('discord-economy')

module.exports.run = async(client, message, args) => {

    function send(message, description) {
        message.channel.send({embed: {
            color: 0x188a02,
            description: ':moneybag: ' + description
        }});
    }

    const membre = message.mentions.users.first() || message.author;

    var output = await eco.FetchBalance(membre.id)
    send(message, `Money de ${membre} : **${output.balance}** <:coin:574530477235634186>`)

};

module.exports.help = {
    name: "money"
}