# This module

## Discord music are a symple module to do a nice music syteme

<br>
<br>

## Import module

```js
const music = require('discord-musique');
```
<br>
<br>

## start module

```js
const music = require('discord-musique');

music.setClient(client)
```
<br>
<br>

## Play music
> ### Note : function play music and return succes embed/error message (you can do message/interaction.reply(func) ^^)
> #### querry = music name / url, member is who the bot gona join channel, textChannel is channel for bot message, ex : when bot finish to play a song send a message in textChannel

<br>

```js
const music = require('discord-musique');

music.setClient(client)

await music.func.play('querry',member,textChannel)
```

## Get music queue
> ### The function return a messageEmbed with queue

<br>

```js
const music = require('discord-musique');

music.setClient(client)

await music.func.queue(member)
```
<br>
<br>

## Set volume
> ### Function return a succes/error message
> #### Volume must be between 1 and 100

<br>

```js
const music = require('discord-musique');

music.setClient(client)

await music.func.setVolume(member,volume)
```
<br>
<br>

## Skip/Stop/Pause/Resume
> ### Function return a succes/error message

<br>


```js
const music = require('discord-musique');

music.setClient(client)

await music.func.skip(member)
await music.func.stop(member)
await music.func.pause(member)
await music.func.resume(member)
```


