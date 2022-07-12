const func = require('./src/utils/function');
const DistubeEventLoad = require('./src/event/distubeEvent').eventLoad
const DJSEventLoad = require('./src/event/discordjsEvent').eventLoad

function Client(client) {
    if(!client) throw new Error("client invalide");
    const { DisTube } = require('distube')
    const { SpotifyPlugin } = require('@distube/spotify')

    client.distube = new DisTube(client, {
        youtubeDL: false,
        emitNewSongOnly: true,
        leaveOnFinish: true,
        emitAddListWhenCreatingQueue: false,
        plugins: [new SpotifyPlugin()]
    })

    module.exports = {
        client: client,
        setClient: Client,
        func: func
    }

    DistubeEventLoad(client)
    DJSEventLoad(client)

    console.log('Client connecter');
}

module.exports = {
    client: null,
    setClient: Client,
    func: func
}