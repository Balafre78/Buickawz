const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    function sendError(message, description) {
        message.channel.send({embed: {
            color: '15158332',
            description: ':x: ' + description
        }});
    }

        let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!dUser) return sendError(message, `Veuillez mentionner un utilisateur !`)
        if(!message.member.hasPermission("KICK_MEMBERS")) return sendError(message, `Vous n'avez pas la permission !`)
        let dMessage = args.join(" ").slice(22);
        if(dMessage.length < 1) return sendError(message, `Veuillez fournir un message !`)

        var embedB = new Discord.RichEmbed()
        .setTitle(":e_mail: **Message envoyé !**")
        .setThumbnail(message.mentions.users.first().displayAvatarURL)
        .setDescription(`═════════════════`)
        .addField(`De : ${message.author.username}\nA : ${message.mentions.users.first().username}`, `═════════════════`)
        .addField(`${dMessage}`, `═════════════════\nEnvoyé :`)
        .setTimestamp()

        message.author.send(embedB)
        
        var embedA = new Discord.RichEmbed()
        .setTitle(":e_mail: **Message reçu**")
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`═════════════════`)
        .addField(`De : ${message.author.username}\nA : ${message.mentions.users.first().username}`, `═════════════════`)
        .addField(`${dMessage}`, `═════════════════\nReçu :`)
        .setTimestamp()

        dUser.send(embedA)

        message.delete().catch(O_o=>{});
};

module.exports.help = {
    name: "mail"
}