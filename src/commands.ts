'use strict';

import { Message, GuildMember } from "discord.js";
import fs = require('fs');

const WORKING_DIRECTORY = '/mp3/'
var soundPlaying = false;

/**
 * Tells bot to leave any voice channel
 */
module.exports.leave = function (msg: Message) {
  if (msg.guild.voiceConnection) {
    msg.reply('Ok bye... :weary:');
    msg.guild.voiceConnection.disconnect();
  } else {
    msg.reply('I\'m not in a voice channel :sob:');
  }
}

/**
 * Play an mp3
 *  
 * @param {Member} member - who it should be played for
 * @param {String} filename - name of file
 */
module.exports.playFile = function (member: GuildMember, filename: String) {
  if (soundPlaying) {
    return;
  }

  member.voiceChannel.join()
    .then(c => {
      soundPlaying = true;
      const dispatcher = c.playFile(WORKING_DIRECTORY + filename.toLowerCase() + '.mp3');
      dispatcher.on('end', () => {
        soundPlaying = false;
      })
    })
    .catch(console.log);
}

module.exports.listSounds = function (msg: Message) {
  console.log('list files');
  fs.readdir(WORKING_DIRECTORY, (err, files) => {
    console.log('read the directory...');
    console.log(files);

    if (err) {
      console.log(err);
      return;
    }

    let str = "\nMP3s\n\n";
    str += "Usage : !play {sound}\n";
    str += "\nSounds:\n";
    let i = 0;
    files.forEach(f => {
      if (f.endsWith('.mp3') && i < 50) {
        str += ' ' + f.replace('.mp3', '') + '\n';
        i++;
      }
    })
    console.log(str);
    msg.reply(str);
  })
}

module.exports.playSound = function (msg: Message, filename: String) {
  if (soundPlaying) {
    msg.reply("im busy right now!");
    return;
  }
  this.playFile(msg.member, filename);
}

/**
 * Joins the voice channel of user
 */
module.exports.join = function (msg: Message) {
  if (msg.member.voiceChannel) {
    msg.member.voiceChannel.join()
      .then(() => {
        msg.reply('Here I am!! :hugging:');
      })
      .catch(console.log);

  } else {
    msg.reply('I don\'t know where to go :cry:');
  }
}