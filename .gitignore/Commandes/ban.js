const Discord = require('discord.js');
const moment = require('moment')

moment.locale("fr");

function sendError(message, description) {
    message.channel.send({embed: {
        color: '15158332',
        description: ':x: ' + description + ' :x:'
    }});
}

module.exports.run = async(client, message, args) => {

    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send(`Vous n'avez pas la permissions !`);

    if(message.mentions.users.size === 0) {
        return sendError(message, 'Veuillez mentionner un joueur !');
    }

    let ban = message.guild.member(message.mentions.users.first());

    if(!ban) {
        return sendError(message, `Je n'ai pas trouvé l'utilisateur !`)
    }

    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return sendError(message, `Vous n'avez pas la permission !`);

    ban.ban().then(member => {

        var report = new Discord.RichEmbed()
        .setDescription("**Ban**")
        .setColor("#15f153")
        .addField("Utilisateur ban", `- ${member.user}`)
        .addField("Ban par", `- ${message.author}`)
        .addField("Date", `- ${moment().format('LLLL')}`)
        .setColor("0xff0000")

        message.channel.send(`${member.user.username} a été ban par ${message.author.username}`);
        message.mentions.users.first().send(`Vous avez été ban du serveur **${message.guild.name}** par ${message.author.username}`).catch(console.log);

        let reportschannel = message.guild.channels.find(`id`, "571987901324197891");
        if(!reportschannel) return sendError(message, "Je n'ai pas trouvé le channel des logs !");
            reportschannel.send(report);

    });
};

module.exports.help = {
    name: "ban"
};