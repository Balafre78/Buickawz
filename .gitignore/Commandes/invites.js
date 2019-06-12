const Discord = require('discord.js');
const arraySort = require('array-sort')
const table = require('table')

function sendError(message, description) {
    message.channel.send({embed: {
        color: '15158332',
        description: ':x: ' + description
    }});

}

module.exports.run = async(client, message, args, tools) => {

    const membre = message.author;

    let invites = await message.guild.fetchInvites().catch(error => {
        return sendError(message, `Vous n'avez pas la permission`)
    });

    invites = invites.array();

    arraySort(invites, 'uses', { reverse : true });

    let possibleInvites = [['Utilisateur', 'Invitations']]
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.username, invite.uses]);
    })

    const embed = new Discord.RichEmbed()
        .setColor("0xCB5ASE")
        .addField('Liste des invitations :', `\`\`\`${table.table(possibleInvites)}\`\`\``)
        .addField(`Meilleur :`, `\`\`\`
╔═════════════╤═════════════╗
║     En      │   Dev       ║
╚═════════════╧═════════════╝\`\`\``)
        .setFooter(`Demandé par : ${membre.username}`, membre.displayAvatarURL)

    message.channel.send(embed)

};

module.exports.help = {
    name: "invites"
};