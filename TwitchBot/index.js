const tmi = require('tmi.js'),
    { channel, username, password } = require('./settings.json');

const options = {
    options: { debug: true },
    connection: {
        reconnect: true,
        secure: true
    },
    identity : {
        username,
        password
    },
    channels: [channel]
};

var niceTrys = 0;
const client = new tmi.Client(options);
client.connect().catch(console.error);

client.on('connected', () => {
    client.say(channel, 'Gorty is powered on!');
});

client.on('message', (channel, user, message, self) => {
    if(self) return;

    if(message == 'nt') {
        niceTrys++;
        client.say(channel, `solid has nt'd `+ niceTrys+ ' times');
    }

    if(message == '!roll') {
        client.say(channel, `@${user.username} rolled a ${Math.floor(Math.random() * 6) + 1}!`);
    }

    if(message == '!time') {
        var d = new Date();
        var localTime = d.toLocaleTimeString();
        client.say(channel, `It is currently ` + localTime + ` EST`);
    }
});

/*password for twitch account: Zejnhkr5*/