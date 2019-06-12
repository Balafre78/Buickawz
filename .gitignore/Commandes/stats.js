const Discord = require("discord.js");
const moment = require('moment')

module.exports.run = async(client, message, args) => {

    const membre = message.mentions.users.first() || message.author;

    let status = {
        "online": "En ligne :white_check_mark: ",
        "offline": "Hors ligne :white_circle:",
        "idle": "Inactif :large_orange_diamond: ",
        "dnd": "Ne pas déranger :no_entry:",
    };

    var embed = new Discord.RichEmbed()
        .setTitle(`Statistiques`)
        .setThumbnail(`${membre.displayAvatarURL}`)
        .addField(`:scroll: Pseudo :`, `${membre.username}`, true)
        .addField(`:computer: ID :`, `${membre.id}`, true)
        .addField(`:checkered_flag: Crée le :`, `${moment.utc(membre.createdAt).format("LL")}`, true)
        .addField(`:joystick: Jeux actuel :`, `${membre.presence.game ? `${membre.presence.game.name}` : "Ne joue à aucun jeu actuellement"}`, true)
        .addField(`:clock: Rejoin le server discord le :`, `${moment.utc(membre.joinedAt).format("LL")}`, true)
        .addField(`:military_medal: Grade :`, `${membre.rank}`, true)
        .addField(`:beginner: Status :`, status[membre.presence.status], true)
        .setFooter(`Info de ${membre.username}`, membre.displayAvatarURL)

    message.channel.send(embed)
    
};

module.exports.help = {
    name: "stats"
}