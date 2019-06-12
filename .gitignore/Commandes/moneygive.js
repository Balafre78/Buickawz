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
    let somme = args.join(" ").slice(22);
    if(!somme) return sendError(message, "Veuillez définir une somme d'argent à give !");

    var profile = await eco.AddToBalance(rUser.id, somme)
    send(message, `Vou avez give : **${somme}** <:coin:574530477235634186> à : ${rUser}\n\nMoney de ${rUser} : **${profile.newbalance}** <:coin:574530477235634186>`);

};

module.exports.help = {
    name: "moneygive"
}