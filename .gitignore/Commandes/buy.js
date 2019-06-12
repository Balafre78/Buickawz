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

    let [rreason, ChannelName] = args;

    if(!rreason) {
        buy(message, `Que voulez vous acheter ?\n\`!buy channel [NomDuChannel]\` : 15.000 <:coin:574530477235634186>\n\`!buy role [NomDuRole]\` : 100.000 <:coin:574530477235634186>`)
    }

    if(rreason === 'channel') {

        var output1 = await eco.FetchBalance(message.author.id)

        if(output1.balance > 15000) {

            if(!ChannelName) {
                sendError(message, `Veuillez donner un nom à votre channel !`)
            }else{

                var profile = await eco.AddToBalance(message.author.id, -15000)
                
                message.guild.createChannel(`『🔑』${ChannelName}`).then((createdChannel) => {

                    createdChannel.setParent(categoryId).then((settedParent) => {
            
                        settedParent.overwritePermissions(message.guild.roles.find("id", "506845498079182848"), {"READ_MESSAGES": false,});
            
                        settedParent.overwritePermissions(message.author, {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": true, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});
            
                        var embedParent = new Discord.RichEmbed()
                            .setTitle(`Hey, ` + `**${username}**`)
                            .setThumbnail(message.author.displayAvatarURL)
                            .setDescription(`Vous venez d'acheter un channel **Perso**\nNom du Channel : **${ChannelName}**\nPrix : **15.000** <:coin:574530477235634186>\nIl est à vous et vous pouvez modifier les accès !`)
                            .setFooter(`Channel Créer le :`)
                            .setTimestamp()

                        var embedFacture = new Discord.RichEmbed()
                            .setTitle(":money_with_wings:  **Achat Channel**")
                            .setThumbnail(message.author.displayAvatarURL)
                            .setDescription(`═════════════════`)
                            .addField(`Prix : **15000** <:coin:574530477235634186>\nVotre argent : **${profile.newbalance}** <:coin:574530477235634186>`, `═════════════════`)
                            .addField(`Vous venez d'acheté un Channel ( *${ChannelName}* )\n sur **Buickawz**. Vous pouvez dès maintenant inviter \nvos amis avec le \`!invite\``, `═════════════════\nAchat :`)
                            .setTimestamp()
                    
                        settedParent.send(embedParent);
                        message.author.send(embedFacture)
                            
                        }).catch(err => {
                            sendError("Erreur dans la configuration")
                        });
                
                }).catch(err => {
                    sendError("Erreur dans la configuration")
                });

            }
            
        }else{
            sendError(message, `Vous n'avez pas assez d'argent ! Prix : **15.000** <:coin:574530477235634186>`)
        }


    }

    if(rreason === 'pickaxe') {

        var output1 = await eco.FetchBalance(message.author.id)

        if(output1.balance > 15000) {

            if(!ChannelName) {
                sendError(message, `Veuillez donner un nom à votre channel !`)
            }else{

                var profile = await eco.AddToBalance(message.author.id, -15000)
                
                message.guild.createChannel(ChannelName).then((createdChannel) => {

                    createdChannel.setParent(categoryId).then((settedParent) => {
            
                        settedParent.overwritePermissions(message.guild.roles.find("id", "506845498079182848"), {"READ_MESSAGES": false,});
            
                        settedParent.overwritePermissions(message.author, {"READ_MESSAGES": true, "SEND_MESSAGES": true,"ATTACH_FILES": true, "CONNECT": true,"CREATE_INSTANT_INVITE": true, "ADD_REACTIONS": true, "VIEW_CHANNEL": true,});
            
                        var embedParent = new Discord.RichEmbed()
                            .setTitle(`Hey, ` + `**${username}**`)
                            .setThumbnail(message.author.displayAvatarURL)
                            .setDescription(`Vous venez d'acheter un channel **Perso**\nNom du Channel : **${ChannelName}**\nPrix : **15.000** <:coin:574530477235634186>\nIl est à vous et vous pouvez modifier les accès !`)
                            .setFooter(`Channel Créer le :`)
                            .setTimestamp()

                        var embedFacture = new Discord.RichEmbed()
                            .setTitle(":money_with_wings:  **Achat Channel**")
                            .setThumbnail(message.author.displayAvatarURL)
                            .setDescription(`═════════════════`)
                            .addField(`Prix : **15000** <:coin:574530477235634186>\nVotre argent : **${profile.newbalance}**`, `═════════════════`)
                            .addField(`Vous venez d'acheté un Channel ( *${ChannelName}* )\n sur **Buickawz**. Vous pouvez dès maintenant inviter \nvos amis avec le \`!invite\``, `═════════════════\nAchat :`)
                            .setTimestamp()
                    
                        settedParent.send(embedParent);
                        message.author.send(embedFacture)
                            
                        }).catch(err => {
                            sendError("Erreur dans la configuration")
                        });
                
                }).catch(err => {
                    sendError("Erreur dans la configuration")
                });

            }
            
        }else{
            sendError(message, `Vous n'avez pas assez d'argent ! Prix : **15.000** <:coin:574530477235634186>`)
        }


    }

};

module.exports.help = {
    name: "buy"
}