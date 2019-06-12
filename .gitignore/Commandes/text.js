const Discord = require("discord.js");
const ascii = require('ascii-art')

module.exports.run = async(client, message, args) => {

    function sendError(message, description) {
        message.channel.send({embed: {
            color: '15158332',
            description: ':x: ' + description
        }});
    }

    ascii.font(args.join(' '), 'Doom', function(rendered) {

        if(!args) return sendError(message, `Veuillez saisir un mot !`)

        rendered = rendered.trimRight();

        if (rendered.length > 2000) return sendError(message, `Désolé, mais le message est trop long`)

        message.channel.send(rendered, {
            code: 'md'
        })
    })
    
    message.delete().catch(O_o=>{});



};

module.exports.help = {
    name: "text"
}