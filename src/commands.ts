'use strict';

import { Message, GuildMember } from "discord.js";
import fs = require('fs');

const WORKING_DIRECTORY = '/mp3/'
const RESTRICTED_DIRECTORY = '/restricted/'
var soundPlaying = false;

/**
 * Tells bot to leave any voice channel
 */
export function leave(msg: Message) {
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
export function playFile(member: GuildMember, filename: String) {
  if (soundPlaying) {
    return;
  }

  if (member == null || member.voiceChannel == null) {
    console.log('cant play file for a null member');
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

export function listSounds(msg: Message) {
  printFolder(msg, WORKING_DIRECTORY);
  printFolder(msg, RESTRICTED_DIRECTORY);
}

function printFolder(msg: Message, folderName: string) {
  console.log('print folder : ' + folderName);
  fs.readdir(folderName, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }
    let str = "\n" + folderName + "\n\n";
    str += "Usage : !play {sound}\n";
    str += "\nSounds:\n";
    let i = 0;
    files.forEach(f => {
      if (f.endsWith('.mp3') && i < 5) {
        str += '  ' + f.replace('.mp3', '') + '\n';
        i++;
      }
    });
    msg.reply(str);
  });

}

export function playSound(msg: Message, filename: String) {
  if (soundPlaying) {
    msg.reply("im busy right now!");
    return;
  }
  this.playFile(msg.member, filename);
}

/**
 * Joins the voice channel of user
 */
export function join(msg: Message) {
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