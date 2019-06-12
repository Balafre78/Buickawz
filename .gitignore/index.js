const Discord = require('discord.js');
const { Client, Util} = require('discord.js');
const { PREFIX, GOOGLE_API_KEY } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();
const client = new Discord.Client({ disableEveryone: true });
const xp = require("./Storage/xp.json")
  
const fs = require('fs');

// Token \\

client.login(TOKEN);
 
// Client Discord \\

client.on('error', console.error)

client.commands = new Discord.Collection();
 
fs.readdir("./Commandes/", (error, f) => {
    if(error) console.log(error);
 
    let commandes = f.filter(f => f.split(".").pop() === "js");
    if(commandes.length <= 0) return console.log("Aucune commande trouvée !");
 
    commandes.forEach((f) => {
 
        let commande = require(`./Commandes/${f}`);
        console.log(`Commande : ${f} est chargée !`);
 
    client.commands.set(commande.help.name, commande);
    });
});
 
fs.readdir("./Events/", (error, f) => {
    if(error) console.log(error);
    console.log(`Events : ${f.length} en chargement !`);
 
    f.forEach((f) => {
        const events = require(`./Events/${f}`);
        const event = f.split(".")[0];
 
    client.on(event, events.bind(null, client));
    });
});

// Musique \\

    client.on('message', async msg => { // eslint-disable-line
        if (msg.author.bot) return undefined;
        if (!msg.content.startsWith(PREFIX)) return undefined;
   
        const args = msg.content.split(' ');
        const searchString = args.slice(1).join(' ');
        const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(msg.guild.id);
 
        function sendError(msg, description) {
            msg.channel.send({embed: {
                color: 0xe43333,
                description: ':x: ' + description
            }});
        }
        function send(msg, description) {
            msg.channel.send({embed: {
                color: 0xAAFFFF,
                description: ':musical_note: ' + description
            }});
        }
   
        let command = msg.content.toLowerCase().split(' ')[0];
        command = command.slice(PREFIX.length)
   
        if (command === 'play') {
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel) return sendError(msg, 'Je suis désolé mais vous avez besoin d’un canal vocal pour jouer de la musique !');
            const permissions = voiceChannel.permissionsFor(msg.client.user);
            if (!permissions.has('CONNECT')) {
                return sendError(msg, 'Je ne parviens pas à me connecter à votre canal vocal, assurez-vous de disposer des autorisations appropriées !');
            }
            if (!permissions.has('SPEAK')) {
                return sendError(msg, 'Je ne peux pas parler sur ce canal vocal, assurez-vous de disposer des autorisations appropriées !');
            }
   
            if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                const playlist = await youtube.getPlaylist(url);
                const videos = await playlist.getVideos();
                for (const video of Object.values(videos)) {
                    const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
                    await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
                }
                return send(msg, `Playlist: **${playlist.title}** a été ajouté à la file d'attente !`);
           } else {
               try {
                   var video = await youtube.getVideo(url);
               } catch (error) {
                   try {
                       var videos = await youtube.searchVideos(searchString, 10);
                       let index = 0;
                       send(msg, `**Sélection de la Musique:**
   
   ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
   
Veuillez fournir une valeur pour sélectionner l'un des résultats de la recherche, allant de 1 à 10.
                        `);
                        // eslint-disable-next-line max-depth
                        try {
                            var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                                maxMatches: 1,
                                time: 10000,
                                errors: ['time']
                            });
                        } catch (err) {
                            console.error(err);
                            return sendError(msg, 'Aucune valeur ou valeur invalide entrée, annulant la sélection de vidéo.');
                        }
                        const videoIndex = parseInt(response.first().content);
                        var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                    } catch (err) {
                        console.error(err);
                        return sendError(msg, "Je n'ai pu obtenir aucun résultat de recherche.");
                    }
                }
                return handleVideo(video, msg, voiceChannel);
            }
        } else if (command === 'skip') {
            if (!msg.member.voiceChannel) return sendError(msg, "Vous n'êtes pas dans un canal vocal !");
            if (!serverQueue) return sendError(msg, "Il n'y a rien que je puisse Skip pour vous.");
            serverQueue.connection.dispatcher.end('La commande Skip a été utilisée !');
            return undefined;
        } else if (command === 'stop') {
            if (!msg.member.voiceChannel) return sendError(msg, "Vous n'êtes pas dans un canal vocal !");
            if (!serverQueue) return sendError(msg, "Il n'y a rien que je puisse arrêter de jouer");
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end("La commande Stop a été utilisée !");
            send(msg, `Stop de la musique !`)
            return undefined;
        } else if (command === 'volume') {
            if (!msg.member.voiceChannel) return sendError(msg, "Vous n'êtes pas dans un canal vocal !");
            if (!serverQueue) return sendError(msg, "Il n'y a rien qui joue.");
            if (!args[1]) return send(msg, `Le volume actuel est: **${serverQueue.volume}**`);
            serverQueue.volume = args[1];
            serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
            return send(msg, `Je règle le volume à: **${args[1]}**`);
        } else if (command === 'music') {
            if (!serverQueue) return msg.channel.sendError("Il n'y a rien qui joue.");
            return send(msg, `Lecture en cours: **${serverQueue.songs[0].title}**`);
        } else if (command === 'list') {
            if (!serverQueue) return sendError(msg, "Il n'y a rien qui joue.");
            return send(msg, `**File d'attente de la Musique :**
    
${serverQueue.songs.map(song => `**●** ${song.title}`).join('\n')}
    
**Lecture en cours :** ${serverQueue.songs[0].title}
           `);
       } else if (command === 'pause') {
           if (serverQueue && serverQueue.playing) {
               serverQueue.playing = false;
               serverQueue.connection.dispatcher.pause();
               return send(msg, `Pause de la musique !`);
           }
           return sendError(msg, `Il n'y a rien qui joue.`);
       } else if (command === 'resume') {
           if (serverQueue && !serverQueue.playing) {
               serverQueue.playing = true;
               serverQueue.connection.dispatcher.resume();
               return send(msg, `Reprise de la musique`);
           }
           return sendError(msg, `Il n'y a rien qui joue.`);
       }
   
       return undefined;
   });
   
   async function handleVideo(video, msg, voiceChannel, playlist = false) {
       const serverQueue = queue.get(msg.guild.id);
       console.log(video);
       const song = {
           id: video.id,
           title: Util.escapeMarkdown(video.title),
           url: `https://www.youtube.com/watch?v=${video.id}`
       };
       if (!serverQueue) {
           const queueConstruct = {
               textChannel: msg.channel,
               voiceChannel: voiceChannel,
               connection: null,
               songs: [],
               volume: 5,
               playing: true
           };
           queue.set(msg.guild.id, queueConstruct);
   
           queueConstruct.songs.push(song);
   
           try {
               var connection = await voiceChannel.join();
               queueConstruct.connection = connection;
               play(msg.guild, queueConstruct.songs[0]);
           } catch (error) {
               console.error(`Je ne pouvais pas rejoindre le canal vocal: ${error}`);
               queue.delete(msg.guild.id);

               function sendError(msg, description) {
                msg.channel.send({embed: {
                    color: 0xe43333,
                    description: ':x: ' + description
                }});
                }
               return sendError(msg, `Je ne pouvais pas rejoindre le canal vocal: ${error}`);
           }
       } else {
            var SongList = new Discord.RichEmbed()
            .setDescription(`:musical_note: **${song.title}** a été ajouté à la file d'attente !`)
            .setColor(0xAAFFFF)

           serverQueue.songs.push(song);
           console.log(serverQueue.songs);
           if (playlist) return undefined;
           else return serverQueue.textChannel.send(SongList);
        }
        return undefined;
    }
   
    function play(guild, song) {
        const serverQueue = queue.get(guild.id);
   
        if (!song) {
            serverQueue.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }
        console.log(serverQueue.songs);
   
        const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
            .on('end', reason => {
                if (reason === 'Stream is not generating quickly enough.') console.log("La Musique s'est terminée.");
                else console.log(reason);
                serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            .on('error', error => console.error(error));
        dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

        var SongTitle = new Discord.RichEmbed()
        .setDescription(`:musical_note: Commence à jouer: **${song.title}**\n\n<:youtube:553931084975439882> URL : **${song.url}**`)
        .setColor(0xAAFFFF)
   
        serverQueue.textChannel.send(SongTitle);
    }
 
    //Nombre de message
 
   
 
// Gestion des nouveaux membres
 
client.on('guildMemberAdd', member => {

    member.addRole('506845498079182848')
    
    const { Discord, Attachment  } = require('discord.js');
    const attachment = new Attachment('https://pngimage.net/wp-content/uploads/2018/05/bienvenue-png-8.png');
 
    let serverTag = member.guild.name
    const welcomechannel = member.guild.channels.find('id', '571993058162245632')
    return welcomechannel.send(`<@${member.user.id}> a rejoint le serveur **${serverTag}**\nTu est le **${member.guild.memberCount}** sur le serveur !`, attachment)
    
});

client.on('guildMemberRemove', member => {
 
    let serverTag = member.guild.name
    const leavechannel = member.guild.channels.find('id', '573586278361202698')
    return leavechannel.send(`<@${member.user.id}> a quitté le serveur **${serverTag}**\nNous ne sommes plus que : **${member.guild.memberCount}**`)
});

//compteur de messages

client.on('message', message => {

    let xpAdd = Math.floor(Math.random() * 2) + 2;
    
    if(!xp[message.author.id]){
        xp[message.author.id] = {
            xp: 0,
            level: 1
        }
    }

    let curxp = xp[message.author.id].xp;

    let curlvl = xp[message.author.id].level;

    let nxtLvl = xp[message.author.id].level * 300;

    xp[message.author.id].xp = curxp + xpAdd;

    if(nxtLvl <= xp[message.author.id].xp){
        xp[message.author.id].level = curlvl + 1;

        let lvlup = new Discord.RichEmbed()
        .setTitle(`Hey, **${message.author.username}**`)
        .setDescription(`Vous venez de passer\nniveau **${curlvl + 1}**`)
        .setThumbnail(message.author.displayAvatarURL)

        message.channel.send(lvlup).then(msg => {msg.delete(7000)});

    }

    fs.writeFile("./Storage/xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err)
    })

    function send(message, description) {
        message.channel.send({embed: {
            color: 0xffc33b,
            description: ':scroll: ' + description
        }});
    }
 
    var userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf-8'));
    var sender = message.author;
    var msg = message.content.toUpperCase();
     
    if(msg === PREFIX + 'MESSAGES') {
        send(message, 'Vous avez envoyé **' + userData[sender.id].messagesSent + '** messages !' )
    }

    if(msg === PREFIX + 'LEVEL') {
        var embedXP = new Discord.RichEmbed()
        .setThumbnail(message.author.displayAvatarURL)
        .setDescription(`${message.author.username}, Vous êtes\nniveau **${xp[message.author.id].level}**`)
        message.channel.send(embedXP)
    }
     
    if(!userData[sender.id]) userData[sender.id] = {
        messageSent: 0
    }
     
    userData[sender.id].messagesSent++;
     
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
        if (err) console.error(err);
        
    });

     
});

// SERVER STATS

const serverStats = {
    guildID: '',
    totalUserID: ''
};


client.on('guildMemberAdd', member => {

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUserID).setName(`MEMBRE : ${member.guild.memberCount}`)

})

client.on('guildMemberRemove', member => {

    if (member.guild.id !== serverStats.guildID) return;

    client.channels.get(serverStats.totalUserID).setName(`MEMBRE : ${member.guild.memberCount}`)
    
})