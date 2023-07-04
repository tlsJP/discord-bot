"use strict";
import { VoiceState } from "discord.js";
import * as v from "@discordjs/voice";

const WORKING_DIRECTORY = "/mp3/";
var soundPlaying = false;

var connection: v.VoiceConnection;

const player = v.createAudioPlayer();

/**
 * @deprecated
 * Play an mp3
 *
 * @param {VoiceState} voiceState - who it should be played for
 * @param {String} filename - name of file
 */
export function playFile(voiceState: VoiceState, filename: String) {
  if (soundPlaying) {
    return;
  }

  if (voiceState == null || voiceState.channel == null) {
    console.log("cant play file for a null member");
    return;
  }

  // Join a new channel if necessary
  if (voiceState.channelId != connection?.joinConfig?.channelId) {
    // connection = v.joinVoiceChannel({
    //   channelId: voiceState.channelId,
    //   guildId: voiceState.channel.guildId,
    //   adapterCreator: voiceState.guild.voiceAdapterCreator,
    // });
  }

  const resource = v.createAudioResource(
    `${WORKING_DIRECTORY}${filename.toLowerCase()}.mp3`
  );

  player.play(resource);
}
