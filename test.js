const music = require('./index');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

const { Client } = require('discord.js');

const client = new Client({ 
    intents: 98303,
});

client.login('OTc5Njc4NjQ3NTEyMzUwNzUx.G1gbIs.DyG4bOHUS__hX8xqhRqOglgcTSvgzMO3HzbqnY');

music.setClient(client)

client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()){
        return interaction.reply(await music.func.play('bigflo et oli',interaction.member,interaction.channel))
    }
})

setTimeout(async x =>{
    return console.log(await music.func.queue(client.guilds.cache.get('965555518963859537').members.cache.get('967746293302702100')))
    
},10000)