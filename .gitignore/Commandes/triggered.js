const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {
    
    const { Discord, Attachment  } = require('discord.js');
    const attachment = new Attachment('https://cdn.discordapp.com/attachments/506456338432262145/567019739835006978/giphy.gif');
    

    message.channel.send(attachment)
    message.delete().catch(O_o=>{});
    
};

module.exports.help = {
    name: "triggered"
}



