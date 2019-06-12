const Discord = require("discord.js")

module.exports = async(client) => {
    console.log(`${client.user.username} est en ligne !`)

    let statuses = [
        "Buickawz Officiel",
        "!help",
        "Dév par Edofo & Balafre !"
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: "PLAYING"});

    }, 5000)

}
// Game activity \\