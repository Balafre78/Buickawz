const Discord = require('discord.js');

function sendError(message, description) {
    message.channel.send({embed: {
        color: 0xe43333,
        description: ':x: ' + description
    }});
}

module.exports.run = async(client, message, args) => {

    const categoryId = "572395691696193567"

    var username = message.author.username;
    var userDiscriminator = message.author.discriminator;

    var bool = false;

    let rreason = args.join(" ").slice(22);

    message.guild.channels.forEach((channel) => {

        if (channel.name == username.toLowerCase() + "-" + userDiscriminator) {

            sendError(message, `Vous avez déjà un ticket d'ouvert`);

            bool = true;

        }

    });

    if (bool == true) return;

    var embedCreateTicket = new Discord.RichEmbed()
        .setTitle(`Hey, ` + message.author.username + ` !`)
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`Channel support\nticket créer !\n#${username.toLowerCase() + "-" + userDiscriminator}`)

    message.channel.send(embedCreateTicket)

    message.guild.createChannel(username + "-" + userDiscriminator, "text").then((createdChannel) => {

        createdChannel.setParent(categoryId).then((settedParent) => {

            settedParent.overwritePermissions(message.guild.roles.find("id", "506845498079182848"), {"READ_MESSAGES": false,});

            settedParent.overwritePermissions(message.guild.roles.find("id", "494928320820150282"), {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

            settedParent.overwritePermissions(message.author, {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

            var embedParent = new Discord.RichEmbed()
                .setTitle(`Hey, ` + message.author.username.toString())
                .setThumbnail(message.author.displayAvatarURL)
                .setDescription(`\nVoilà le channel\nQuestion : ${rreason}`);
        
            settedParent.send(embedParent);
                
            }).catch(err => {
                sendError("Erreur dans la configuration")
            });
    
    }).catch(err => {
        sendError("Erreur dans la configuration")
    });

};

module.exports.help = {
    name: "0000"
};