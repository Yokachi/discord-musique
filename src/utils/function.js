
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

async function play(query,members,chanText) {
    const VoiceChannel = members.voice.channel;

    if(!VoiceChannel) return `L'user doit être dans un salon vocal`

    const client = require('../../index').client
    if(!client) return console.log('merci de définir un client')
    client.distube.play( VoiceChannel, query, { textChannel: chanText, member: members })
    return `🔊 Requete ressue.`
}

async function volume(members,volume) {
    const client = require('../../index').client
    if(!client) return console.log('merci de définir un client')
    const VoiceChannel = members.voice.channel;
    if(!VoiceChannel) return `L'user doit être dans un salon vocal`

    if(volume > 100 || volume < 1) return `merci de definir le volume entre 1 et 100`

    client.distube.setVolume(VoiceChannel, volume);
    return `Volume definie sur : \`${volume}%\``
}

async function skip(members) {
    const client = require('../../index').client
    if(!client) return console.log('merci de définir un client')
    const VoiceChannel = members.voice.channel;
    if(!VoiceChannel) return `L'user doit être dans un salon vocal`

    const queue = await client.distube.getQueue(VoiceChannel);

    await queue.skip(VoiceChannel);
    return `⏩ - Le sons a été passez`
}

async function stop(members) {
    const client = require('../../index').client
    if(!client) return console.log('merci de définir un client')
    const VoiceChannel = members.voice.channel;
    if(!VoiceChannel) return `L'user doit être dans un salon vocal`

    const queue = await client.distube.getQueue(VoiceChannel);

    await queue.stop(VoiceChannel);
    return `⏹ - Le sons a été arettez`
}

async function pause(members) {
    const client = require('../../index').client
    if(!client) return console.log('merci de définir un client')
    const VoiceChannel = members.voice.channel;
    if(!VoiceChannel) return `L'user doit être dans un salon vocal`

    const queue = await client.distube.getQueue(VoiceChannel);

    await queue.pause(VoiceChannel);
    return `⏸ - Le sons a été mis en pause`
}

async function resume(members) {
    const client = require('../../index').client
    if(!client) return console.log('merci de définir un client')
    const VoiceChannel = members.voice.channel;
    if(!VoiceChannel) return `L'user doit être dans un salon vocal`

    const queue = await client.distube.getQueue(VoiceChannel);

    await queue.resume(VoiceChannel);
    return `⏭ - Le sons a repris`
}

async function queue(members) {
    const client = require('../../index').client
    if(!client) return console.log('merci de définir un client')
    const VoiceChannel = members.voice.channel;
    if(!VoiceChannel) return `L'user doit être dans un salon vocal`

    const queue = await client.distube.getQueue(VoiceChannel);

    if(!queue) return `Pas de music en attente`

    let description = ``
    const songs = queue.songs
    console.log(songs)
    for (let i = 0; i < songs.length; i++) {
        let music = songs[i]
        let int = i + 1;
        description += `**${int}** - [${music.name}](${music.url}) \n> **Source** : ${music.source} \n> **Vue** : ${music.views} \n> **Durée** : ${music.formattedDuration}\n\n`
    }
    // for(music of songs){
    // }
    return new MessageEmbed()
        .setColor('#7F00FF')
        .setTitle(`Liste des sons en attente :`)
        .setDescription(`${description}`)
}

module.exports = {
    play: play,
    setVolume: volume,
    skip: skip,
    stop: stop,
    pause: pause,
    resume: resume,
    queue: queue,
}

// switch(options.getSubcommand()) {
//     case 'play' : {
        
//     }
//     case 'volume' : {
        
//     }
//     case 'settings' : {
//         const queue = await client.distube.getQueue(VoiceChannel);

//         if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente` })

//         switch(options.getString('options')){
//             case 'skip' : {
//                 await queue.skip(VoiceChannel);
//                 return interaction.reply({ content: `⏩ - Le sons a été passez` })
//             }
//             case 'stop' : {
//                 await queue.stop(VoiceChannel);
//                 return interaction.reply({ content: `⏹ - Le sons a été arettez` })
//             }
//             case 'pause' : {
//                 await queue.pause(VoiceChannel);
//                 return interaction.reply({ content: `⏸ - Le sons a été mis en pause` })
//             }
//             case 'resume' : {
//                 await queue.resume(VoiceChannel);
//                 return interaction.reply({ content: `⏭ - Le sons a repris` })
//             }
//             case 'queue' : {
//                 let description = ``
//                 let int = 0
//                 for(music of queue.songs){
//                     int ++
//                     description += `**${int}** - [${music.name}](${music.url}) \n> **Source** : ${music.source} \n> **Vue** : ${music.views} \n> **Durée** : ${music.formattedDuration}\n\n`
//                 }
//                 return interaction.reply({ embeds: [new MessageEmbed()
//                     .setColor('#7F00FF')
//                     .setTitle(`Liste des sons en attente :`)
//                     .setDescription(`${description}`)
//                 ]})
//             }
//         }
//         return
//     }
    

// }