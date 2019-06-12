const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    
    const membre = message.author;

    if(!message.guild.member(message.author).hasPermission("SEND_MESSAGES")) return message.send(`Vous n'avez pas les permissions !`).catch(console.error);

    if(!message.guild.member(client.user).hasPermission("SEND_MESSAGES")) return message.channel.send(`Je n'ai pas la permisisions !`).catch(console.error);
        var info = new Discord.RichEmbed()
            .setTitle(":comet: Information sur **Buickawz** :comet:")
            .setDescription("Serveur Minecraft Pvp-Faction / Mini-Jeux 1.12.2")
            .addField("Le site : ","[Buickawz](https://buickawz.000webhostapp.com/)")
            .addField("!help","Voir la liste des commandes")
            .addField("La Boutique","[Boutique](http://buickawz.buycraft.net/)")
            .setColor("0xAAFFFF")
            .setFooter(`Demandé par ${membre.username}`, membre.displayAvatarURL)
        message.channel.send(info);

        
};

module.exports.help = {
    name: "info"
}