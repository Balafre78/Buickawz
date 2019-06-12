const Discord = require('discord.js');

function sendError(message, description) {
    message.channel.send({embed: {
        color: 0xe43333,
        description: ':x: ' + description
    }});
}

module.exports.run = async(client, message, args) => {
    
    const categoryId = "572395691696193567"
    
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return sendError(message, `Vous n'avez pas la permission`);

        if(message.channel.parentID == categoryId){

            var embedCloseTicket = new Discord.RichEmbed()
            .setTitle(`Hey, ` + message.author.username)
            .setThumbnail(message.author.displayAvatarURL)
            .setDescription(`\nTon ticket à\nété fermé`);
    
            message.channel.send(embedCloseTicket);

            await

            message.channel.delete();

        }else{

            sendError(message, `Commande disponible que dans un ticket`)

        }
}

module.exports.help = {
    name: "close"
}