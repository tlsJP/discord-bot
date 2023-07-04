'use strict';
// import { Command, CommandoClient } from 'discord.js-commando';
import { Message } from 'discord.js';
import * as repo from './WorkingDirectory.json';

var soundPlaying = false;

// module.exports = class Play extends Command {
//   constructor(client: CommandoClient) {
//     super(client, {
//       name: 'play',
//       group: 'music',
//       memberName: 'play',
//       description: 'Play a sound'
//     });
//   }

//   async run(msg: any) {
//     let filename = msg.argString.trim().toLocaleLowerCase();
//     console.log(msg.member.nickname + ' : play(' + filename + ')...');

//     if (soundPlaying) {
//       console.log("bot is busy playing something.");
//       msg.reply("im busy right now!");
//       return;
//     }

//     return new Promise<Message>(() => {
//       if (msg.member.voiceChannel) {
//         msg.member.voiceChannel.join()
//           .then(c => {
//             soundPlaying = true;
//             const dispatcher = c.playFile(repo.workingDirectory + filename + '.mp3');
//             dispatcher.on('end', () => {
//               soundPlaying = false;
//             })
//           })
//           .catch(console.log);

//       } else {
//         msg.reply('I don\'t know where to go :cry:');
//       }
//     });
//   }
// }