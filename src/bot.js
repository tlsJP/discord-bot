var Discord = require('discord.js');
var cmd = require('./commands.js');
var auth = require('./auth.json');

console.log('starting!');

var bot = new Discord.Client();

function channelChanged(oldMember, newMember) {
  return (oldMember && oldMember.voiceChannel && oldMember.voiceChannel.name)
    && (newMember && newMember.voiceChannel && newMember.voiceChannel.name)
    && oldMember.voiceChannel.name != newMember.voiceChannel.name;
}

/**
 * 'Welcome' people who join a voice channel
 */
bot.on('voiceStateUpdate', (oldMember, newMember) => {

  // if there are changes to the member's state that do not include a change in the channel, do nothing
  if (!channelChanged(oldMember, newMember)) {
    return;
  }

  if (newMember.voiceChannel) {
    cmd.playFile(newMember, 'sup');
  }
});

bot.on('ready', function () {
  console.log('Logged in as %s', bot.user.username);
});

bot.on('message', msg => {

  let content = msg.content;

  if (content.substring(0, 1) == '!') {
    let args = content.substring(1).split(' ');
    let req = args[0];

    console.log(msg.member.user.username + ' - ' + req);

    args.splice(0, 1);
    switch (req) {

      case 'echo':
        msg.reply(args.join(' '));
        break;

      case 'play':
        cmd.playSound(msg, args.concat().toString());
        break;

      case 'join':
        cmd.join(msg);
        break;

      case 'list':
        cmd.listSounds(msg);
        break;

      case 'stop':
      case 'leave':
        cmd.leave(msg);
        break;

      default:
        msg.reply(':angry: Unrecognized command!');

    }
  }

});

bot.login(auth.token);