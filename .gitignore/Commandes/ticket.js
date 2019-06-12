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

    message.guild.channels.forEach((channel) => {

        if (channel.name == username.toLowerCase() + "-" + userDiscriminator) {

            sendError(message, `Vous avez déjà un ticket d'ouvert`);

            bool = true;

        }

    });

    if (bool == true) return;

    var embed = new Discord.RichEmbed()
        .setTitle(`Hey, ${message.author.username} !`)
        .setDescription(`**Merci de donner quel est votre demande de support**\n\n\:o: **: Bug**\n:knife: **: TpKill avec preuves**\n:pick: **: Problème**\n:construction_worker: **: Demande autre**\n:heavy_multiplication_x: **: Annulé**`)
        .setColor(0x42ff00)

    message.channel.send(embed).then(msg => {
        msg.react('⭕') 
        msg.react('🔪')
        msg.react('⛏')
        msg.react('👷')
        msg.react('✖')

    
            const bugFilter = (reaction, user) => reaction.emoji.name === '⭕' && user.id === message.author.id;

            const tpkillFilter = (reaction, user) => reaction.emoji.name === '🔪' && user.id === message.author.id;

            const problèmeFilter = (reaction, user) => reaction.emoji.name === '⛏' && user.id === message.author.id;

            const demandeFilter = (reaction, user) => reaction.emoji.name === '👷' && user.id === message.author.id;

            const annuléFilter = (reaction, user) => reaction.emoji.name === '✖' && user.id === message.author.id;
    
            const bug = msg.createReactionCollector(bugFilter, { time : 60000 })

            const tpkill = msg.createReactionCollector(tpkillFilter, { time : 60000 })

            const problème = msg.createReactionCollector(problèmeFilter, { time : 60000 })

            const demande = msg.createReactionCollector(demandeFilter, { time : 60000 })

            const annulé = msg.createReactionCollector(annuléFilter, { time : 60000 })

            annulé.on('collect', r => {

                msg.delete()

                var embedAnnulé = new Discord.RichEmbed()
                .setTitle(`Vous avez annulé la\ndemande de support`)
                .setThumbnail(message.author.displayAvatarURL)
                .setColor(0xe43333)

                message.channel.send(embedAnnulé)

            })
    
            bug.on('collect', r => {

                    msg.delete()

                    var embedTicketBug = new Discord.RichEmbed()
                    .setTitle(`Channel support\nticket créer !`)
                    .setThumbnail(message.author.displayAvatarURL)
                    .setDescription(`Channel support\nticket créer !`)
                    .setColor(0xffff00)

                    message.channel.send(embedTicketBug)

                    message.guild.createChannel(username + "-" + userDiscriminator, "text").then((createdChannel) => {

                    createdChannel.setParent(categoryId).then((settedParent) => {

                            settedParent.overwritePermissions(message.guild.roles.find("id", "506845498079182848"), {"READ_MESSAGES": false,});

                            settedParent.overwritePermissions(message.guild.roles.find("id", "494928320820150282"), {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

                            settedParent.overwritePermissions(message.author, {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

                    var embedParent = new Discord.RichEmbed()
                        .setTitle(`Hey, ` + message.author.username.toString())
                        .setThumbnail(message.author.displayAvatarURL)
                        .setDescription(`\nVoilà le channel\nVous avez demandez un \nsupport pour un **BUG**`)
                        .setColor(0x42ff00)
        
                    settedParent.send(embedParent);
                
                }).catch(err => {
                    sendError("Erreur dans la configuration")
                });
    
            }).catch(err => {
                sendError("Erreur dans la configuration")
            });

        })

        tpkill.on('collect', r => {

                msg.delete()

                var embedTicketBug = new Discord.RichEmbed()
                .setTitle(`Channel support\nticket créer !`)
                .setThumbnail(message.author.displayAvatarURL)
                .setDescription(`Channel support\nticket créer !`)
                .setColor(0xffff00)

                message.channel.send(embedTicketBug)

                message.guild.createChannel(username + "-" + userDiscriminator, "text").then((createdChannel) => {

                createdChannel.setParent(categoryId).then((settedParent) => {

                        settedParent.overwritePermissions(message.guild.roles.find("id", "506845498079182848"), {"READ_MESSAGES": false,});

                        settedParent.overwritePermissions(message.guild.roles.find("id", "494928320820150282"), {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

                        settedParent.overwritePermissions(message.author, {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

                var embedParent = new Discord.RichEmbed()
                    .setTitle(`Hey, ` + message.author.username.toString())
                    .setThumbnail(message.author.displayAvatarURL)
                    .setDescription(`\nVoilà le channel\nVous avez demandez un \nsupport pour un **TPKILL**`)
                    .setColor(0x42ff00)

                settedParent.send(embedParent);
        
            }).catch(err => {
                sendError("Erreur dans la configuration")
            });

        }).catch(err => {
            sendError("Erreur dans la configuration")
        });

        })

        problème.on('collect', r => {

            msg.delete()

            var embedTicketProblème = new Discord.RichEmbed()
            .setTitle(`Channel support\nticket créer !`)
            .setThumbnail(message.author.displayAvatarURL)
            .setDescription(`Channel support\nticket créer !`)
            .setColor(0xffff00)

            message.channel.send(embedTicketProblème)

            message.guild.createChannel(username + "-" + userDiscriminator, "text").then((createdChannel) => {

            createdChannel.setParent(categoryId).then((settedParent) => {

                    settedParent.overwritePermissions(message.guild.roles.find("id", "506845498079182848"), {"READ_MESSAGES": false,});

                    settedParent.overwritePermissions(message.guild.roles.find("id", "494928320820150282"), {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

                    settedParent.overwritePermissions(message.author, {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

            var embedParent = new Discord.RichEmbed()
                .setTitle(`Hey, ` + message.author.username.toString())
                .setThumbnail(message.author.displayAvatarURL)
                .setDescription(`\nVoilà le channel\nVous avez demandez un \nsupport pour un **PROBLÈME**`)
                .setColor(0x42ff00)

            settedParent.send(embedParent);
    
            }).catch(err => {
            sendError("Erreur dans la configuration")
            });

        }).catch(err => {
        sendError("Erreur dans la configuration")
        });

        })

        demande.on('collect', r => {

            msg.delete()

            var embedTicketDemande = new Discord.RichEmbed()
            .setTitle(`Channel support\nticket créer !`)
            .setThumbnail(message.author.displayAvatarURL)
            .setDescription(`Channel support\nticket créer !`)
            .setColor(0xffff00)

            message.channel.send(embedTicketDemande)

            message.guild.createChannel(username + "-" + userDiscriminator, "text").then((createdChannel) => {

            createdChannel.setParent(categoryId).then((settedParent) => {

                    settedParent.overwritePermissions(message.guild.roles.find("id", "506845498079182848"), {"READ_MESSAGES": false,});

                    settedParent.overwritePermissions(message.guild.roles.find("id", "494928320820150282"), {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

                    settedParent.overwritePermissions(message.author, {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": false, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});

            var embedParent = new Discord.RichEmbed()
                .setTitle(`Hey, ` + message.author.username.toString())
                .setThumbnail(message.author.displayAvatarURL)
                .setDescription(`\nVoilà le channel\nVous avez demandez un \nsupport pour une **DEMANDE**`)
                .setColor(0x42ff00)

            settedParent.send(embedParent);
    
            }).catch(err => {
            sendError("Erreur dans la configuration")
            });

        }).catch(err => {
        sendError("Erreur dans la configuration")
        });

        })

})

};

module.exports.help = {
    name: "ticket"
};