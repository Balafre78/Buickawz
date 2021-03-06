const Discord = require('discord.js');

module.exports.run = async(client, message, args) => {

    var embed5 = new Discord.RichEmbed()
    .setTitle(`Menu des commandes`)
    .setDescription(`Préfix : **!** + [commande]`)
    .setColor("0xd800ff")

    var embed = new Discord.RichEmbed()
    .setTitle(`${message.author.username}, Veuillez consulter vos messages privées`)
    .setColor("0xd800ff")

    message.author.send({
        "embed": {
          "color": 16765104,
          "footer": {
            "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
            "text": "Commandes Joueurs"
          },
          "fields": [
            {
              "name": ":pick: `info`",
              "value": "*Information sur le serveur*",
              "inline": true
            },
            {
              "name": ":eye: `stats <pseudo>`",
              "value": "*Statistiques d'un joueur*",
              "inline": true
            },
            {
              "name": ":sparkles: `ping`",
              "value": "*Votre ping*",
              "inline": true
            },
            {
              "name": ":link: `invite`",
              "value": "*Invitation au channel*",
              "inline": true
            },
            {
              "name": ":pencil: `reports <pseudo> [Raison]`",
              "value": "*Report un joueur*",
              "inline": true
            },
            {
              "name": ":tickets: `ticket`",
              "value": "*Ouvrir un channel de support*",
              "inline": true
            },
            {
              "name": "<:discord:576776716870221824> `avatar <pseudo>`",
              "value": "*Avatar d'un joueur*",
              "inline": true
            },
            {
              "name": ":scroll: `messages`",
              "value": "*Messages envoyés*",
              "inline": true
            }
          ]
        }
      })

    message.author.send({
        "embed": {
          "color": 12779770,
          "footer": {
            "icon_url": "https://www.pngkey.com/png/full/356-3562324_app-logo-youtube-music-icon.png",
            "text": "Commandes Musiques"
          },
          "fields": [
            {
              "name": ":arrow_forward: `play <URL|MUSIQUE|VIDEO>`",
              "value": "*Jouer de la musique*",
              "inline": true
            },
            {
              "name": ":fast_forward: `skip`",
              "value": "*Passer à la musique suivante*",
              "inline": true
            },
            {
              "name": ":pause_button: `pause`",
              "value": "*Pause de la musique*",
              "inline": true
            },
            {
              "name": ":play_pause: `resume`",
              "value": "*Reprendre la musique*",
              "inline": true
            },
            {
              "name": ":record_button: `music`",
              "value": "*Lecture en cours*",
              "inline": true
            },
            {
              "name": ":signal_strength: `volume <nombre>`",
              "value": "*Volume de la musique*",
              "inline": true
            },
            {
              "name": " :stop_button: `stop`",
              "value": "*Arêter la musique*",
              "inline": true
            },
            {
              "name": ":symbols: `list`",
              "value": "*Voir la liste des musiques*",
              "inline": true
            }
          ]
        }
      })
    
    message.author.send({
        "embed": {
          "color": 1608194,
          "footer": {
            "icon_url": "https://nowskills.co.uk/wp/wp-content/uploads/2018/07/money-PNG-e1532606569895.png",
            "text": "Commandes Money"
          },
          "fields": [
            {
              "name": "<:coin:574530477235634186> `money <pseudo>`",
              "value": "*Connaitre la money d'un joueur*",
              "inline": true
            },
            {
              "name": ":money_with_wings: `pay <pseudo> [somme]`",
              "value": "*Donner de l'argent à un joueur*",
              "inline": true
            },
            {
              "name": ":clock2: `daily`",
              "value": "*Recevoir sa prime du jour*    ",
              "inline": true
            },
            {
              "name": ":trophy: `baltop`",
              "value": "*Meilleur joueur du serveur*",
              "inline": true
            }
          ]
        }
      })

    message.author.send({
      "embed": {
        "color": 16711711,
        "footer": {
          "icon_url": "https://vignette.wikia.nocookie.net/scribblenauts/images/0/06/Gear.png/revision/latest?cb=20130511220556",
          "text": "Commandes Staff"
        },
        "fields": [
          {
            "name": ":nut_and_bolt: `kick <pseudo>`",
            "value": "*Expulser un membre du serveur*",
            "inline": true
          },
          {
            "name": ":hammer: `ban <pseudo>`",
            "value": "*Bannir un membre du serveur*",
            "inline": true
          },
          {
            "name": ":mute: `mute <pseudo> [Temps]`",
            "value": "*Mute un membre du serveur*",
            "inline": true
          },
          {
            "name": ":speaker: `unmute <pseudo>`",
            "value": "*Unmute un membre du serveur*",
            "inline": true
          },
          {
            "name": ":wastebasket: `clear <nombre entre 1 et 100>`",
            "value": "*Clear entre 1 et 100 messages*",
            "inline": true
          },
          {
            "name": ":e_mail: `mail <pseudo> [Message]`",
            "value": "*Envoyé un message privé a un joueur*",
            "inline": true
          },
          {
            "name": ":thinking: `Sondage [messages]`",
            "value": "*Sondage sur [message] ?*",
            "inline": true
          },
          {
            "name": ":euro: `moneygive <pseudo> [somme]`",
            "value": "*Give de la money a un joueur*",
            "inline": true
          },
                      {
            "name": ":exclamation: `warn <pseudo>`",
            "value": "*Alerte sur comportement d'un membre du staff*",
            "inline": true
          },
                      {
            "name": ":repeat: `reload [Commande]`",
            "value": "*Reload une commande*",
            "inline": true
          }
        ]
      }
    }

    )

    message.channel.send(embed)

};

module.exports.help = {
    name: "help"
};