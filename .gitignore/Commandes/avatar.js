const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    const membre = message.mentions.users.first() || message.author;

    var embed = new Discord.RichEmbed()
    .setTitle(`Avatare de **${membre.username}**`)
    .setDescription(`[Télécharger](${membre.displayAvatarURL})`)
    .setImage(membre.displayAvatarURL)

    message.channel.send(embed)
    message.delete().catch(O_o=>{});

};

module.exports.help = {
    name: "avatar"
}