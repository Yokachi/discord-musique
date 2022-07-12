const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

async function eventAdd(client) {
    client.on('interactionCreate', async interaction => {
        if(interaction.isButton()){
            if(interaction.customId === 'music-back'){
                return interaction.reply('back desactiver')
            }else if(interaction.customId === 'music-down'){
                const { member, guild, channel } = interaction;
            
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
                
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
    
                let volume = queue.volume - 10
                if(volume < 10) volume = 10
                
                client.distube.setVolume(VoiceChannel, volume);
    
                const newEmbed = new MessageEmbed()
                    .setAuthor(interaction.message.embeds[0].author)
                    .setDescription(interaction.message.embeds[0].description)
                for (fields of interaction.message.embeds[0].fields) {
                    if(fields.name == '💥 **Volume**'){
                        newEmbed.addFields({name: `${fields.name}`, value: `\`${volume}%\``, inline:true})
                    }else{
                        newEmbed.addFields({name: `${fields.name}`, value: fields.value, inline:true })
                    }
                }
                interaction.message.edit({ embeds: [newEmbed] })
                return interaction.reply({ content:`Volume definie sur : \`${volume}%\``, ephemeral:true })
            }else if(interaction.customId === 'music-pause'){
                const { member, guild, channel } = interaction;
    
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
    
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
    
                if(queue.paused) return interaction.reply({ content:`La musique est deja en pause`, ephemeral:true })
    
                const row = new MessageActionRow()
    
                for (button of interaction.message.components[0].components) {
                    if(button.customId == 'music-pause'){
                        row.addComponents(
                            new MessageButton()
                                .setCustomId('music-resume')
                                .setLabel('Resume')
                                .setEmoji('▶')
                                .setStyle('SECONDARY'),
                        )
                    }else {
                        row.addComponents(
                            new MessageButton()
                                .setCustomId(button.customId)
                                .setLabel(button.label)
                                .setEmoji(button.emoji)
                                .setStyle(button.style),
                        )
                    }
                    
                }
    
                interaction.message.edit({ components: [row] })
                
                await queue.pause(VoiceChannel);
                return interaction.reply({ content:`⏸ - Le sons a été mis en pause`, ephemeral:true })
            }else if(interaction.customId === 'music-queue'){
                const { member, guild, channel } = interaction;
    
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
                
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
            
                let description = ``
                let int = 0
                const songs = queue.songs
                console.log(songs)
                for (let i = 0; i < songs.length; i++) {
                    let music = songs[i]
                    let int = i + 1;
                    description += `**${int}** - [${music.name}](${music.url}) \n> **Source** : ${music.source} \n> **Vue** : ${music.views} \n> **Durée** : ${music.formattedDuration}\n\n`
                }
                // for(music of songs){
                // }
                return interaction.reply({ embeds: [new MessageEmbed()
                    .setColor('#7F00FF')
                    .setTitle(`Liste des sons en attente :`)
                    .setDescription(`${description}`)
                ]})
            }else if(interaction.customId === 'music-repeat-stop'){
                const { member, guild, channel } = interaction;
    
            
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
                
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
            
                if(queue.stopped) return interaction.reply({ content:`La musique est deja eretter`, ephemeral:true })
                
                const row = new MessageActionRow()
    
                for (button of interaction.message.components[0].components) {
                    if(button.customId == 'music-repeat-stop'){
                        row.addComponents(
                            new MessageButton()
                                .setCustomId('music-repeat')
                                .setLabel('Repeat')
                                .setEmoji('🎛')
                                .setStyle('SECONDARY'),
                        )
                    }else {
                        row.addComponents(
                            new MessageButton()
                                .setCustomId(button.customId)
                                .setLabel(button.label)
                                .setEmoji(button.emoji)
                                .setStyle(button.style),
                        )
                    }
                    
                }
    
                queue.setRepeatMode(0)
    
                interaction.message.edit({ components: [row] })
    
                return interaction.reply(`Repeat mode désactiver`)
            }else if(interaction.customId === 'music-repeat'){
                const { member, guild, channel } = interaction;
            
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
                
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
            
                if(queue.stopped) return interaction.reply({ content:`La musique est deja eretter`, ephemeral:true })
                
                const row = new MessageActionRow()
    
                for (button of interaction.message.components[0].components) {
                    if(button.customId == 'music-repeat'){
                        row.addComponents(
                            new MessageButton()
                                .setCustomId('music-repeat-stop')
                                .setLabel('Repeat')
                                .setEmoji('❌')
                                .setStyle('SECONDARY'),
                        )
                    }else {
                        row.addComponents(
                            new MessageButton()
                                .setCustomId(button.customId)
                                .setLabel(button.label)
                                .setEmoji(button.emoji)
                                .setStyle(button.style),
                        )
                    }
                    
                }
    
                queue.setRepeatMode(1)
    
                interaction.message.edit({ components: [row] })
    
                return interaction.reply(`Repeat mode activer`)
            }else if(interaction.customId === 'music-resume'){
                const { member, guild, channel } = interaction;
            
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
                
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
            
                if(!queue.paused) return interaction.reply({ content:`La musique joue deja`, ephemeral:true })
    
                const row = new MessageActionRow()
    
                for (button of interaction.message.components[0].components) {
                    if(button.customId == 'music-resume'){
                        row.addComponents(
                            new MessageButton()
                                .setCustomId('music-pause')
                                .setLabel('Pause')
                                .setEmoji('⏸')
                                .setStyle('SECONDARY'),
                        )
                    }else {
                        row.addComponents(
                            new MessageButton()
                                .setCustomId(button.customId)
                                .setLabel(button.label)
                                .setEmoji(button.emoji)
                                .setStyle(button.style),
                        )
                    }
                    
                }
    
                interaction.message.edit({ components: [row] })
                
                await queue.resume(VoiceChannel);
                return interaction.reply({ content:`▶ - Le sons a repris`, ephemeral:true })
            }else if(interaction.customId === 'music-shuffle'){
                const { member, guild, channel } = interaction;
    
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
                
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
            
                await queue.shuffle(VoiceChannel);
                return interaction.reply({ content:`⏹ - Les song on été mélanger`, ephemeral:true })
            }else if(interaction.customId === 'music-skip'){
                const { member, guild, channel } = interaction;
    
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
    
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
    
                if(queue.songs.length < 2) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
                
                await queue.skip(VoiceChannel);
                return interaction.reply({ content: `⏩ - Le sons a été passez`, ephemeral:true })
            }else if(interaction.customId === 'music-stop'){
                const { member, guild, channel } = interaction;
    
            
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
                
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
            
                if(queue.stopped) return interaction.reply({ content:`La musique est deja eretter`, ephemeral:true })
                
                await queue.stop(VoiceChannel);
                return interaction.reply({ content:`⏹ - La musique a été couper`, ephemeral:true })
            }else if(interaction.customId === 'music-up'){
                const { member, guild, channel } = interaction;
            
                const VoiceChannel = member.voice.channel;
                if(!VoiceChannel) return interaction.reply({ content: `⛔ Tu dois etre dans un salon vocal`, ephemeral:true })
                
                const queue = await client.distube.getQueue(VoiceChannel);
                if(!queue) return interaction.reply({ content: `⛔ Pas de sons en attente`, ephemeral:true })
    
                let volume = queue.volume + 10
                if(volume < 10) volume = 10
                
                client.distube.setVolume(VoiceChannel, volume);
    
                const newEmbed = new MessageEmbed()
                    .setAuthor(interaction.message.embeds[0].author)
                    .setDescription(interaction.message.embeds[0].description)
                for (fields of interaction.message.embeds[0].fields) {
                    if(fields.name == '💥 **Volume**'){
                        newEmbed.addFields({name: `${fields.name}`, value: `\`${volume}%\``, inline:true})
                    }else{
                        newEmbed.addFields({name: `${fields.name}`, value: fields.value, inline:true })
                    }
                }
                interaction.message.edit({ embeds: [newEmbed] })
                return interaction.reply({ content:`Volume definie sur : \`${volume}%\``, ephemeral:true })
            }
        }
    });
}

module.exports = {
    eventLoad: eventAdd,
}