const Discord = require("discord.js");

var eco = require('discord-economy')

module.exports.run = async(client, message, args) => {

 
    //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
    //(message.author.id + message.guild.id) can be your way to store guild based id's
    //filter: x => x.userid.endsWith(message.guild.id)
 
    //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
      eco.Leaderboard({
        limit: 3, //Only takes top 5 ( Totally Optional )
        filter: x => x.balance > 50 //Only allows people with more than 100 balance ( Totally Optional )
      }).then(async users => { //make sure it is async
 
        if (users[0]) var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
        if (users[1]) var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
        if (users[2]) var thirdplace = await client.fetchUser(users[2].userid) //Searches for the user object in discord for third place


        var output = await eco.Leaderboard({
          filter: x => x.balance > 50,
          search: message.author.id
        })

        var outputmoney = await eco.FetchBalance(message.author.id)

        var embed = new Discord.RichEmbed()
        .setTitle(`Listes des joueurs les plus riches de **Buickawz** :`)
        .setDescription(`════════════════════`)
        .addField(`:first_place: -  **${firstplace.username || `Personne n'a la première place`}**  ➜  **${users[0] && users[0].balance + ` <:coin:574530477235634186>` || 'Pas de money'}**\n\n:second_place: -  **${secondplace.username || `Personne n'a la deuxième place`}**  ➜  **${users[1] && users[1].balance + ` <:coin:574530477235634186>` || 'Pas de money'}**\n\n:third_place: -  **${thirdplace.username || `Personne n'a la troisième place`}**  ➜  **${users[2] && users[2].balance + ` <:coin:574530477235634186>` || 'Pas de money'}**`, `════════════════════`)
        .addField(`Votre **place** :\n\n\`${output}\` - **${message.author.username}** ➜ **${outputmoney.balance}** <:coin:574530477235634186>`, `════════════════════`)
      message.channel.send(embed)


      })

    
    };


module.exports.help = {
    name: "baltop"
}