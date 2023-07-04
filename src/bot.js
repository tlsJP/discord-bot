

const { Client, Events, GatewayIntentBits, Collection, REST,Routes  } = require("discord.js");


const { token,clientId, guildId } = require('./auth.json');

const cmdJoinChannel = require('./commands/JoinChannel');



const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
bot.commands = new Collection();
const commands=[];

bot.commands.set(cmdJoinChannel.data.name, cmdJoinChannel);
commands.push(cmdJoinChannel.data.toJSON());


let d = new Date();
console.log(d + " : Starting the bot!");

bot.once(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});


bot.login(token);

bot.on(Events.InteractionCreate, async interaction => {
  console.log(interaction.toString);

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
});

const rest = new REST().setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

function destroy() {
  let d = new Date();
  console.log(d + " : Destroying the bot...");
  bot.destroy();
}

/**
 *
 * @param oldState
 * @param newState
 * @returns
 */
function channelChanged(oldState, newState) {
  let oldChannel = oldState?.channel?.name;
  let newChannel = newState?.channel?.name;

  return oldChannel === undefined || newChannel != oldChannel;
}

/**
 * Answers if the bot was not previously in a channel
 * 
 * @param oldState 
 * @param newState 
 * @returns 
 */
function firstChannel(oldState, newState) {
  return oldState.channel == null && newState.channel != null;
}

/**
 * 'Welcome' people who join a voice channel
 */
bot.on(
  Events.VoiceStateUpdate,
  (oldState, newState) => {

    //only play welcome if the voice channel changed or if they were not previously in a voice channel
    if (
      firstChannel(oldState, newState) ||
      channelChanged(oldState, newState)
    ) {
      // cmd.playFile(newState, "sup");
      // play when ppl join
    }
  }
);

bot.on(Events.Error, (e) => {
  let d = new Date();
  console.log(d.toString() + " : Oh no an error!");
  console.log(e);
  destroy();
  process.exit(1);
});
