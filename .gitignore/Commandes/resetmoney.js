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

    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.sendError(message, `Vous n'avez pas la permission !`);

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return sendError(message, "Veuillez mentionner un utilisateur !");

    eco.SetBalance(rUser.id, 1)
    eco.AddToBalance(rUser.id, -1)

    send(message, `Vous avez reset la money de ${rUser}`)

};

module.exports.help = {
    name: "resetmoney"
}