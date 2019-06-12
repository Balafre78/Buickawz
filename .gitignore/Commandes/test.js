const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch")

module.exports.run = async(client, message, args) => {

    const membre = message.mentions.users.first() || message.author;

    const canvas = Canvas.createCanvas(800, 300)
    const ctx = canvas.getContext("2d")

    const background = await Canvas.loadImage("C:/Users/Utilisateur/Documents/BotBuickawz/Storage/font.png")
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "#000"
    ctx.strokeRect(10, 10, 780, 280)

    const {body:buffer} = await snekfetch.get(membre.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 37, 37, 225, 225);

    ctx.font = "68px Consolas"
    ctx.fillStyle = "#262626"
    ctx.fillText(`Bienvenue sur \nBuickawz,\n${membre.username}` , 290, 85)

    const attachment = new Discord.Attachment(

        canvas.toBuffer(),
        "image-test.png"
    
    );

    message.channel.send(attachment)
    
};

module.exports.help = {
    name: "test"
}