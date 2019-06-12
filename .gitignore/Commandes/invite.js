const Discord = require('discord.js');

function sendGood(message, description) {
    message.channel.send({embed: {
        color: 0xAAFFFF,
        description: ':comet: ' + description
    }});
}

module.exports.run = async(client, message, args) => {

message.channel.createInvite().then(invite => sendGood(message, `Votre lien d'invitation : https://discord.gg/${invite.code}`))

}

module.exports.help = {
    name: `invite`
}