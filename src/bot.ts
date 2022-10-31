"use strict";

import { Client, Events, GatewayIntentBits, VoiceState } from "discord.js";
import * as cmd from "./commands.js";
import * as auth from "./auth.json";

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

init();

function init() {
  let d = new Date();
  console.log(d + " : Starting the bot!");

  bot.once(Events.ClientReady, (c) => {
    console.log(`Logged in as ${c.user.tag}`);
  });

  bot.login(auth.token);
}

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
function channelChanged(oldState: VoiceState, newState: VoiceState): Boolean {
  let oldChannel = oldState?.channel?.name;
  let newChannel = newState?.channel?.name;

  return oldChannel === undefined || newChannel != oldChannel;
}

function firstChannel(oldState: VoiceState, newState: VoiceState) {
  return oldState.channel == null && newState.channel != null;
}

/**
 * 'Welcome' people who join a voice channel
 */
bot.on(
  Events.VoiceStateUpdate,
  (oldState: VoiceState, newState: VoiceState) => {
    oldState.channel.name;

    //only play welcome if the voice channel changed or if they were not previously in a voice channel
    if (
      firstChannel(oldState, newState) ||
      channelChanged(oldState, newState)
    ) {
      cmd.playFile(newState, "sup");
    }
  }
);

bot.on("ready", () => {
  console.log("Logged in as %s", bot.user.username);
});

bot.on("error", (e: Error) => {
  let d = new Date();
  console.log(d.toString() + " : Oh no an error!");
  console.log(e);
  destroy();
  process.exit(1);
});

bot.on("message", (msg) => {
  let content = msg.content;

  if (content.substring(0, 1) == "!") {
    let args = content.substring(1).split(" ");
    let req = args[0];
    args.splice(0, 1);

    let d = new Date();
    console.log(
      d.toString() + " [" + msg.member.user.username + "]: " + content
    );

    switch (req) {
      case "echo":
        msg.reply(args.join(" "));
        break;

      default:
      // msg.reply(':angry: Unrecognized command!');
    }
  }
});
