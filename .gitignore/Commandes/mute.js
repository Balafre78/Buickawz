const Discord = require('discord.js');
const moment = require('moment');

function sendError(message, description) {
    message.channel.send({embed: {
        color: 0xe43333,
        description: ':x: ' + description
    }});
}

function send(message, description) {
    message.channel.send({embed: {
        color: 0x31c53a,
        description: ':ballot_box_with_check: ' + description
    }});
}

module.exports.run = async(client, message, args) => {

    const membre = message.mentions.members.first() || message.member;
    //if(!member) return message.channel.send("Veuillez mentionner un utilisateur !")

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sendError(message, `Vous n'avez pas la permission`);

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return sendError(message, `Vous devez mentionner un utilisateur`);

    if(toMute.id === message.author.id) return sendError(message, "Vous ne pouvez pas vous mute");
    if(toMute.highestRole.position >= message.member.highestRole.positon) return sendError(message, "Vous ne pouvez pas mute un utilisateur supérieur !");

    let role = message.guild.roles.find(r => r.name === "🤐Mute🤐");

        if(toMute.roles.has(role.id)) return sendError(message, "Cette utilisateur est déjà mute !");

        await toMute.addRole(role);
        await toMute.removeRole('506845498079182848')

        send(message, `${membre.user.tag} a bien été mute !`);

        return;
    }


module.exports.help = {
    name: `mute`
}    