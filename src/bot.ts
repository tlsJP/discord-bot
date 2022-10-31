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

bot.on(Events.Error, (e: Error) => {
  let d = new Date();
  console.log(d.toString() + " : Oh no an error!");
  console.log(e);
  destroy();
  process.exit(1);
});
