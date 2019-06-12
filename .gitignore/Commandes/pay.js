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

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return sendError(message, "Veuillez mentionner un utilisateur !");
    let somme = args.join(" ").slice(22);
    if(!somme) return sendError(message, "Veuillez définir une somme d'argent !");
    var output = await eco.FetchBalance(message.author.id)
    if (somme < 0) return sendError(message, `Ne pas soutirer de l'argent à vos amis`)
    if (output.balance < somme) return sendError(message, `Vous n'avez pas asser de money !`)
 
    var transfer = await eco.Transfer(message.author.id, rUser.id, somme)
    var auteur = await eco.FetchBalance(message.author.id)
    send(message, `Vous avez donner : ${somme} <:coin:574530477235634186> à : ${rUser.tag}\n\nVotre money : **${auteur.newbalance}** <:coin:574530477235634186>`);

};

module.exports.help = {
    name: "pay"
}