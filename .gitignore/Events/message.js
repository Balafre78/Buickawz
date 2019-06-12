const Discord = require("discord.js");
const prefix = "!";

function sendDM(message, description) {
    message.channel.send({embed: {
        color: '15158332',
        description: ':x:' + description
    }});
}

module.exports = async(client, message) => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return sendDM(message, `**Vous ne pouvez utiliser le BOT que sur un serveur !**`)

    if(!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commande = args.shift();
    
    const cmd = client.commands.get(commande);
    
    if(!cmd) return;
    
    cmd.run(client, message, args);
};