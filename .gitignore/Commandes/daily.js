const Discord = require("discord.js");

var eco = require('discord-economy')

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

        var output = await eco.Daily(message.author.id)

        if (output.updated) {

        var profile = await eco.AddToBalance(message.author.id, 60)
        send(message, `Vou avez reçu votre prime du jour : **60** <:coin:574530477235634186>\n\nVotre money : **${profile.newbalance}** <:coin:574530477235634186>`);
   
      } else {
        sendError(message, `Vous avez **déja** pris votre prime du jour !\n\n:x: Revenez dans : **${output.timetowait}** pour avoir votre prime`)
      }
   
}

module.exports.help = {
    name: "daily",
}