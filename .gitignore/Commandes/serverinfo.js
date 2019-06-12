const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};
let verifLevels = ["Inéxistant", "Faible", "Moyen", "Fort", "Hard"];
let region = {
    "brazil": ":flag_br: Brésil",
    "eu-central": ":flag_eu: Europe Centrale",
    "singapore": ":flag_sg: Singapour",
    "us-central": ":flag_us: U.S. Centrale",
    "sydney": ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. Est",
    "us-south": ":flag_us: U.S. Sud",
    "us-west": ":flag_us: U.S. Ouest",
    "eu-west": ":flag_eu: Western Europe",
    "vip-us-east": ":flag_us: VIP U.S. East",
    "london": ":flag_gb: Londre",
    "amsterdam": ":flag_nl: Amsterdam",
    "hongkong": ":flag_hk: Hong Kong",
    "russia": ":flag_ru: Russie",
    "southafrica": ":flag_za:  Afrique du sud"
};

const embed = new Discord.RichEmbed()
    .setTitle(`Information sur le serveur`)
    .addField(":scroll: Nom :", message.guild.name, true)
    .addField(":computer: ID :", message.guild.id, true)
    .addField(":construction_worker: Propiétaire :", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
    .addField(":flag_white: Region :", region[message.guild.region], true)
    .addField(":pushpin: Nombre d'utilisateur :", `Il y a **${message.guild.memberCount}** utilisateur`, true)
    .addField(":joystick: Nombre de joueur :", `Il y a **${message.guild.members.filter(member => !member.user.bot).size}** bots`, true)
    .addField(":robot: Nombre de bot :", `Il y a **${message.guild.members.filter(member => member.user.bot).size}** joueurs`, true)
    .addField(":closed_lock_with_key: Niveau de vérification :", `Le niveau est **${verifLevels[message.guild.verificationLevel]}**`, true)
    .addField(":pencil: Nombre de Channels :", `Il y a **${message.guild.channels.size}** Channels`, true)
    .addField(":orange_book: Nombre de Rôles", `Il y a **${message.guild.roles.size}** Rôles`, true)
    .addField(":date: Date de création :", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
    .setThumbnail(message.guild.iconURL)
message.channel.send({embed});

};

module.exports.help = {
    name: `serverinfo`
}