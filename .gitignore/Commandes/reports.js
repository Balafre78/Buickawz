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

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return sendError(message, "Je n'ai pas trouvé l'utilisateur !");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("**Reports**")
    .setColor("#15f153")
    .addField("Utilisateur report", `- ${rUser} avec l'ID : ${rUser.id}`)
    .addField("Report par", `- ${message.author} avec l'ID : ${message.author.id}`)
    .addField("Channel", `- ${message.channel}`)
    .addField("Date", `- ${moment().format('LLLL')}`)
    .addField("Raison", `- ${rreason}`);

    let reportschannel = message.guild.channels.find(`id`, "571987901324197891");
    if(!reportschannel) return sendError(message, "Je n'ai pas trouvé le channel des reports !");

    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}

module.exports.help = {
    name: `reports`
}