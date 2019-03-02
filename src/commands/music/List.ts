'use strict';
import { Command, CommandoClient, CommandMessage } from 'discord.js-commando';
import { Message } from 'discord.js';
import * as fs from 'fs';
import * as repo from './WorkingDirectory.json';

const DESIRED_COLUMN_WIDTH: number = 6;

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
      fs.readdir(repo.workingDirectory, (err, files) => {

        if (err) {
          console.log(err);
          return;
        }

        console.log("Number of files found : " + files.length);
        let maxFileName = 1;
        files.forEach((f) => {
          maxFileName = f.length - 3 > maxFileName ? f.length - 3 : maxFileName;
        })

        let str = "\nMP3s\n\n";
        str += "Usage : !play {sound}\n\n";
        str += '`';
        str += "\nSounds:\n";


        for (let i = 0; i < files.length;) {
          let f = files[i];

          // Create row of sounds
          let row = [];
          for (let j = 0; j < DESIRED_COLUMN_WIDTH;) {
            if (!f) {
              break;
            }
            if (f.endsWith('.mp3')) {
              row[j] = f.replace('.mp3', '').padStart(maxFileName, ' ');
              j++;
            }

            // Don't forget to move the file array pointer
            i++;
            f = files[i];

          }

          str += row.join("") + "\n";

        }


        msg.reply(str + '`')
          .catch(err => {
            console.log(err);
            console.log(str.length);
          });
      })
    });
  }
}