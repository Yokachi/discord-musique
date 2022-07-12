const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

async function eventAdd(client) {

    client.distube.on("error", (channel, error) => console.log(
        "An error encountered: " + error
    ));


    client.distube.on('playSong', (queue, song) => {
      const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('music-down')
                .setLabel('Down')
                .setEmoji('🔉')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('music-back')
                .setLabel('Back')
                .setEmoji('⏮')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('music-pause')
                .setLabel('Pause')
                .setEmoji('⏸')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('music-skip')
                .setLabel('Skip')
                .setEmoji('⏭')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('music-up')
                .setLabel('Up')
                .setEmoji('🔊')
                .setStyle('SECONDARY'),
        )
        const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('music-stop')
                .setLabel('Stop')
                .setEmoji('⏹')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('music-shuffle')
                .setLabel('Shuffle')
                .setEmoji('🔀')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('music-queue')
                .setLabel('Queue')
                .setEmoji('🎼')
                .setStyle('SECONDARY'),
            new MessageButton()
                .setCustomId('music-repeat')
                .setLabel('Repeat')
                .setEmoji('🎛')
                .setStyle('SECONDARY'),
        )
            
      let description = `I playing : [${song.name}](${song.url}) Now\nQueue :\n\n`
      let int = 0
      for(music of queue.songs){
          int ++
          description += `**${int}** - [${music.name}](${music.url}) \n> **Source** : ${music.source} \n> **Views** : ${music.views} \n> **Duration** : ${music.formattedDuration}\n\n`
      }
      queue.textChannel.send({ embeds: [new MessageEmbed()
          .setColor('#7F00FF')
          .setAuthor({ name: 'NOW PLAYING', iconURL: song.user.displayAvatarURL() })
          .setDescription(`✅ - [${song.name}](${song.url})\n`)
          .addFields(
                { name: '🙍‍♂️ **Requested By**', value: `<@${song.user.id}>`, inline: true },
                { name: '🔊 **Song By**', value: `[\`${song.uploader.name}\`](${song.uploader.url})`, inline: true },
                { name: '⌚ **Duration**', value: `\`${song.formattedDuration}\``, inline: true },
                { name: '💥 **Volume**', value: `\`${queue.volume}%\``, inline: true },
                { name: '⏸ **Pause**', value: `\`NO\``, inline: true },
          )
      ], components: [row]})
      queue.textChannel.send({ content: 'ㅤ', components: [row2]})
    })


    client.distube.on('addSong', (queue, song) => {
        queue.textChannel.send({ embeds: [new MessageEmbed()
            .setColor('#7F00FF')
            .setAuthor({ name: 'ADDED TO QUEUE', iconURL: song.user.displayAvatarURL() })
            .setDescription(`✅ - [${song.name}](${song.url})\n`)
            .addFields(
                { name: '🙍‍♂️ **Requested By**', value: `<@${song.user.id}>`, inline: true },
                { name: '🔊 **Song By**', value: `[\`${song.uploader.name}\`](${song.uploader.url})`, inline: true },
                { name: '⌚ **Duration**', value: `\`${song.formattedDuration}\``, inline: true },
            )
        ]})
    })


    client.distube.on('addList', (queue, playlist) =>
        queue.textChannel.send({ embeds: [new MessageEmbed()
            .setColor('#7F00FF')
            .setTitle(`Song as been add to queue`)
            .setDescription(`[${song.name}](${song.url}) \n> **Source** : ${song.source} \n> **Views** : ${song.views} \n> **Duration** : ${song.formattedDuration}\n\n`)
        ]})
    )
}

module.exports = {
    eventLoad: eventAdd,
}