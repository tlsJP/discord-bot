'use strict';

import { Message, GuildMember } from "discord.js";
import * as  fs from 'fs';

const WORKING_DIRECTORY = '/mp3/'
var soundPlaying = false;

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
  console.log('list files');
  fs.readdir(WORKING_DIRECTORY, (err, files) => {

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
        str += '  ' + f.replace('.mp3', '') + '\n';
        i++;
      }
    })

    msg.reply(str);
  })
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