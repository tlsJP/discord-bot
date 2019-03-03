'use strict';

import { Message, GuildMember } from "discord.js";
import * as  fs from 'fs';

const WORKING_DIRECTORY = '/mp3/'
const RESTRICTED_DIRECTORY = '/restricted/'
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
