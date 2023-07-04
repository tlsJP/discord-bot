
const { SlashCommandBuilder } = require('discord.js');
const discordVoice = require('@discordjs/voice');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Joins the voice channel of the commander"),
  async execute(interaction) {
    let channelId = interaction.member.voice.channelId;
    
    
    
    if (channelId) {
      await interaction.reply("im cooming!");
      connectToChannel(interaction.member.voice.channel);

    } else {
      await interaction.reply("I don't  know where to go :cry:");
    }
  },
};

async function connectToChannel(channel) {
	const connection = discordVoice.joinVoiceChannel({
		channelId: channel.id,
		guildId: channel.guild.id,
		adapterCreator: createDiscordJSAdapter(channel),
	});

	try {
		await entersState(connection, VoiceConnectionStatus.Ready, 30e3);
		return connection;
	} catch (error) {
		connection.destroy();
		throw error;
	}
}

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
