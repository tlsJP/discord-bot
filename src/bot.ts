'use strict';

import { Client, GuildMember } from 'discord.js';
import * as cmd from './commands.js';
import * as auth from './auth.json';

var bot: Client;

init();

function init() {
  let d = new Date();
  console.log(d + ' : Starting the bot!');
  bot = new Client();
  bot.login(auth.token);
}

function destroy() {
  let d = new Date();
  console.log(d + ' : Destroying the bot...');
  bot.destroy();
}

function channelChanged(oldMember: GuildMember, newMember: GuildMember) {
  return (oldMember && oldMember.voiceChannel && oldMember.voiceChannel.name)
    && (newMember && newMember.voiceChannel && newMember.voiceChannel.name)
    && oldMember.voiceChannel.name != newMember.voiceChannel.name;
}

function firstChannel(oldMember: GuildMember, newMember: GuildMember) {
  return oldMember.voiceChannel == null && newMember.voiceChannel != null;
}

/**
 * 'Welcome' people who join a voice channel
 */
bot.on('voiceStateUpdate', (oldMember: GuildMember, newMember: GuildMember) => {

  //only play welcome if the voice channel changed or if they were not previously in a voice channel
  if (channelChanged(oldMember, newMember) || firstChannel(oldMember, newMember)) {
    cmd.playFile(newMember, 'sup');
  }

});

bot.on('ready', () => {
  console.log('Logged in as %s', bot.user.username);
});

bot.on('error', (e: Error) => {
  let d = new Date();
  console.log(d.toString() + ' : Oh no an error!');
  console.log(e);
  destroy();
  init();
})

bot.on('message', msg => {

  let content = msg.content;

  if (content.substring(0, 1) == '!') {
    let args = content.substring(1).split(' ');
    let req = args[0];

    let d = new Date();
    console.log(d.toString() + ' : ' + msg.member.user.username + ' - ' + req);

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
