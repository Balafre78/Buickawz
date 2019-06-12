const Discord = require('discord.js');
const moment = require('moment')

moment.locale("fr");

function sendError(message, description) {
    message.channel.send({embed: {
        color: 0xe43333,
        description: ':x: ' + description
    }});
}

module.exports.run = async(client, message, args) => {

    const membre = message.mentions.members.first() || message.member;
    //if(!member) return message.channel.send("Veuillez mentionner un utilisateur !")

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.sendError(message, `Vous n'avez pas la permission`);
        if(!rUser) return sendError(message, "Veuillez mentionner un utilisateur");

        let reportEmbed = new Discord.RichEmbed()
        .setDescription("**Warn**")
        .setColor("0xffb900")
        .addField("Utilisateur warn", `- ${rUser} avec l'ID : ${rUser.id}`)
        .addField("Warn par", `- ${message.author} avec l'ID : ${message.author.id}`)
        .addField("Date", `- ${moment().format('LLLL')}`)
        
        let reportschannel = message.guild.channels.find(`id`, "571987901324197891");
        if(!reportschannel) return sendError(message, "Je n'ai pas trouvé le channel des logs !");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}

module.exports.help = {
    name: `warn`
}