"use strict";

import {
  SlashCommandBuilder,
  CommandInteraction,
  GuildMember,
} from "discord.js";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Joins the voice channel of the commander"),
  async execute(interaction: CommandInteraction) {
    let channelId = (interaction.member as GuildMember).voice.channelId;
    if (channelId) {
    } else {
      await interaction.reply("I don't  know where to go :cry:");
    }
  },
};

// module.exports = class JoinChannel extends Command {
//   constructor(client: CommandoClient) {
//     super(client, {
//       name: 'join',
//       group: 'util',
//       memberName: 'join',
//       description: 'Joins the voice channel of the commander'
//     });
//   }

//   async run(msg: CommandMessage) {

//     return new Promise<Message>(() => {
//       if (msg.member.voiceChannel) {
//         msg.member.voiceChannel.join()
//           .then(() => {
//             msg.reply('Here I am!! :hugging:');
//           })
//           .catch(console.log);

//       } else {
//         msg.reply('I don\'t know where to go :cry:');
//       }
//     });
//   }
// }
