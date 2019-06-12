const Discord = require("discord.js");


function sendError(message, description) {
    message.channel.send({embed: {
        color: '15158332',
        description: ':x: ' + description
    }});
}

function sendGood(message, description) {
    message.channel.send({embed: {
        color: 0xAAFFFF,
        description: ':wastebasket: ' + description
    }});
}

var embed = new Discord.RichEmbed()
    .setDescription(`:x: Je ne peux pas supprimer les messages antérrieur à 14 jours`)
    .setColor(15158332)

module.exports.run = async(client, message, args) => {

    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return sendError(message, `Vous n'avez pas les permissions !`).catch(console.error);

    if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) return sendError(message, `Je n'ai pas la permisisions !`).catch(console.error);

    if(!args[0]) return sendError(message, `Vous devez spécifiez un nombre entre **1** et **100** message(s) à suprimer !`);

    if(isNaN(args[0])) return sendError(message, `Vous devez spécifiez un nombre entre **1** et **100** message(s) à suprimer !`);

    message.channel.bulkDelete(args[0]).catch(err => {
        message.channel.send(embed)
    });

    sendGood(message, `**${args[0]}** message(s) ont été supprimés !`);
    
};

module.exports.help = {
    name: "clear"
}