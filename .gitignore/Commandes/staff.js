const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

    var fonda = new Discord.RichEmbed()
    .setTitle("Fondateur")
    .addField("● **Balafre78**", "*Dévloppeur / Hébegeur*")
    .addField("● **TheGeek**", "*Community Manager / Builder*")
    .setColor("0xff0000")
    
    var admin = new Discord.RichEmbed()
    .setTitle("Administrateur")
    .addField("● **Balloo78**", "*Builder*")
    .addField("● **MacAkaoueth**", "*Responsable Builder*")
    .addField("● **GalaxyDelta**", "*Builder*")
    .addField("● **Juloup78**", "*Anti-Cheater*")
    .setColor("0x0000ff")

    var smodo = new Discord.RichEmbed()
    .setTitle("Super Modérateur")
    .addField("Matchiboy", "Graphiste")
    .setColor("0xfddc00")

    var modo = new Discord.RichEmbed()
    .setTitle("Modérateur")
    .addField("● **dr_kiki85**", "*Builder*")
    .addField("● **Nounours <3**", "*Vive les Ours !*")
    .setColor("#1a5218")

    var helper = new Discord.RichEmbed()
    .setTitle("Helper")
    .setColor("0x73ee6c")

    message.channel.sendEmbed(fonda)
    message.channel.sendEmbed(admin)
    message.channel.sendEmbed(smodo)
    message.channel.sendEmbed(modo)
    message.channel.sendEmbed(helper)
};

module.exports.help = {
    name: "staff"
}

