const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch")

module.exports.run = async(client, message, args) => {

    const membre = message.mentions.users.first() || message.author;

    const canvas = Canvas.createCanvas(2000, 1333)
    const ctx = canvas.getContext("2d")

    const background = await Canvas.loadImage("C:/Users/Utilisateur/Documents/BotBuickawz/Storage/saltman.jpg")
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = "#000"
    ctx.strokeRect(10, 10, 780, 280)

    const {body:buffer} = await snekfetch.get(membre.displayAvatarURL);
    const avatar = await Canvas.loadImage(buffer);
    ctx.drawImage(avatar, 700, 150, 700, 700);

    ctx.font = "125px Impact"
    ctx.fillStyle = "#000"
    ctx.fillText(`${membre.username}` , 900, 1150)

    const attachment = new Discord.Attachment(

        canvas.toBuffer(),
        "image-test.png"
    
    );

    message.channel.send(attachment)
    
};

module.exports.help = {
    name: "salt"
}