const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    function sendError(message, description) {
        message.channel.send({embed: {
            color: 0xe43333,
            description: ':x: ' + description
        }});
    }

    let rreason = args.join(" ").slice(0);
    if(!rreason) return sendError(message, `Inscrire un spam !`)
    message.delete().catch(O_o=>{});
    message.channel.send(`${rreason}`)
    message.channel.send(`${rreason}`)
    message.channel.send(`${rreason}`)
    message.channel.send(`${rreason}`)
    message.channel.send(`${rreason}`)

    
};

module.exports.help = {
    name: "spam"
}