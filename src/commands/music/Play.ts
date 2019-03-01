'use strict';
import { Command, CommandoClient, CommandMessage } from 'discord.js-commando';
import { Message } from 'discord.js';

const WORKING_DIRECTORY = '/mp3/'
var soundPlaying = false;

module.exports = class Play extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'play',
      group: 'music',
      memberName: 'play',
      description: 'Play a sound'
    });
  }

  async run(msg: CommandMessage) {
    console.log(msg.member.nickname + ' : play(' + msg.argString.trim() + ')...');

    return new Promise<Message>(() => {
      if (msg.member.voiceChannel) {

        let filename = msg.argString;

        msg.member.voiceChannel.join()
          .then(c => {
            const dispatcher = c.playFile(WORKING_DIRECTORY + filename.toLocaleLowerCase() + '.mp3');
            dispatcher.on('end', () => {
              soundPlaying = false;
            })
          })
          .catch(console.log);

      } else {

      }
    });
  }
}