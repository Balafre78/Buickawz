const Discord = require("discord.js");
const moment = require('moment')

moment.locale("fr");

module.exports.run = async(client, message, args) => {


    const { Attachment } = require('discord.js');
    const attachment = new Attachment('https://cdn.discordapp.com/attachments/530118434743386163/573797119165464577/gif_agoz.gif');
    
    function sendError(message, description) {
        message.channel.send({embed: {
            color: 0xe43333,
            description: ':x: ' + description
        }});
    }

    let question = args.join(" ").slice(0);
    if(!question) return sendError(message, `Veuillez inscrire un sondage`)

    var embed = new Discord.RichEmbed()
    .setDescription("***Sondage***")
    .addField(`**${question}**`, "\n\n*Réagissez avec ✅ ou ❌*")
    .setColor("0x0fff00")

    var embedReports = new Discord.RichEmbed()
    .setDescription(`**Sondage**`)
    .addField(`Question :`, `${question}`)
    .addField(`Sondage de :`, `${message.author} avec l'ID : ${message.author.id}`)
    .addField("Date :", `${moment().format('LLLL')}`)

    let sondagechannel = message.guild.channels.find(`id`, "572790370702852109");
    if(!sondagechannel) return sendError(message, "Je n'ai pas trouvé le channel des sondages !");

    sondagechannel.send(attachment)
    .then(function(message) {
        sondagechannel.send(embed)
        .then(function(message) {
            message.react("✅")
            message.react("❌")
        })
        sondagechannel.send(attachment)
    
    let reportschannel = message.guild.channels.find(`id`, "571987901324197891");
    if(!reportschannel) return sendError(message, "Je n'ai pas trouvé le channel des logs !");
    reportschannel.send(embedReports)

    })

    message.delete().catch(O_o=>{});

};

module.exports.help = {
    name: "sondage"
}