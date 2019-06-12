const Discord = require('discord.js');

var eco = require('discord-economy');

function sendError(message, description) {
    message.channel.send({embed: {
        color: 0xe43333,
        description: ':x: ' + description
    }});
}

function buy(message, description) {
    message.channel.send({embed: {
        color: 0x31c53a,
        description: description
    }});
}

module.exports.run = async(client, message, args) => {

    const categoryId = "577929156491477012"

    var username = message.author.username;

    const embed = new Discord.RichEmbed()
    .setTitle(`**Shop**`)
    .addField(`:one: *Channel*`, `15.000 coin`)

    message.channel.send(embed).then(msg => {
        msg.react('⭕')

            const channelFilter = (reaction, user) => reaction.emoji.name === '⭕' && user.id === message.author.id;

            const roleFilter = (reaction, user) => reaction.emoji.name === '⭐' && user.id === message.author.id;

            const channel = msg.createReactionCollector(channelFilter, { time : 60000 })

            channel.on('collect', r => {

                embed.addField(`Vous allez acheter un Channel`, `Donner lui un nom`)

                msg.edit(embed)

        })
    })

};

module.exports.help = {
    name: "buy2"
}