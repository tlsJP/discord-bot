'use strict';
import { Command, CommandoClient, CommandMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import * as fs from 'fs';
import * as repo from './WorkingDirectory.json';

module.exports = class Play extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'list',
      group: 'music',
      memberName: 'list',
      description: 'List available sounds'
    });
  }

  async run(msg: CommandMessage) {
    return new Promise<Message>(() => {
      console.log('list files');
      fs.readdir(repo.workingDirectory, (err, files) => {

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

        msg.reply(str)
          .catch(err => {
            console.log(err);
            console.log(str.length);
          });
      })
    });
  }
}