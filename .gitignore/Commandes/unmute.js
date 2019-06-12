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

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return sendError(message, `Vous n'avez pas la permission !`);

    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return sendError(message, `Vous devez mentionner un utilisateur !`);

    let role = message.guild.roles.find(r => r.name === "🤐Mute🤐");

        if(!role || !toMute.roles.has(role.id)) return sendError(message, "Cette utilisateur n'est pas mute !");

        await toMute.removeRole(role);
        await toMute.addRole('506845498079182848')

        send(message, "Cette utilisateur peut maintenant parlé !");

        return;
    }


module.exports.help = {
    name: `unmute`
}    