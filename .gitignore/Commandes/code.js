const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    function sendError(message, description) {
        message.channel.send({embed: {
            color: '15158332',
            description: ':x: ' + description
        }});
    }

    let code = args.join(" ").slice(0);
    if(!code) return sendError(message, `Veuillez saisir un code !`)

    if(code ===  "16748801") return sendError(message, `Code invalide !`)

};

module.exports.help = {
    name: "code"
}

