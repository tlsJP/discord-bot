'use strict';
import { Command, CommandoClient, CommandMessage } from 'discord.js-commando';
import { Message } from 'discord.js';

module.exports = class JoinChannel extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: 'join',
      group: 'util',
      memberName: 'join',
      description: 'Joins the voice channel of the commander'
    });
  }

  async run(msg: CommandMessage) {

    return new Promise<Message>(() => {
      if (msg.member.voiceChannel) {
        msg.member.voiceChannel.join()
          .then(() => {
            msg.reply('Here I am!! :hugging:');
          })
          .catch(console.log);

      } else {
        msg.reply('I don\'t know where to go :cry:');
      }
    });
  }
}