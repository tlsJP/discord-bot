'use strict';
// import { Command, CommandoClient } from 'discord.js-commando';
import { Message } from 'discord.js';


// module.exports = class LeaveChannel extends Command {
//   constructor(client: CommandoClient) {
//     super(client, {
//       name: 'leave',
//       group: 'util',
//       memberName: 'leave',
//       aliases: ['stop'],
//       description: 'Tells the bot to leave any voice channel it\'s in'
//     });
//   }

//   async run(msg: any) {

//     return new Promise<Message>(() => {
//       if (msg.guild.voiceConnection) {
//         msg.reply('Ok bye... :weary:');
//         msg.guild.voiceConnection.disconnect();
//       } else {
//         msg.reply('I\'m not in a voice channel :sob:');
//       }
//     });
//   }
// }