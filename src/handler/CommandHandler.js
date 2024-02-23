import * as Constants from "../utils/Constants.js";
import * as Commands from "../utils/Commands.js";
import {
  createVoiceConnection,
  destroyVoiceConnection,
  listen,
  stfu,
} from "./VoiceConnectionHandler.js";

let bListen = false;

export default function handleCommand(message, client) {
  if (message.channelId !== Constants.COMMAND_CHANNEL) return;
  if (!message.content.startsWith("!") || message.author.bot) return;
  const command = message.content.toLowerCase();

  if (command === Commands.COMMAND_JOIN) {
    if (message.member.voice.channel) {
      console.log(message.member.voice.channelId);
      try {
        createVoiceConnection({
          channelId: message.member.voice.channelId,
          guildId: Constants.GUILD_ID,
          adapterCreator: client.guilds.cache.get("1056733056909721660")
            .voiceAdapterCreator,
          selfDeaf: false,
        });
        console.log(
          "Bot has joined the voice channel:",
          message.member.voice.channel.name
        );
        // message.channel.send("Successfully joined the voice channel!");
      } catch (error) {
        console.error("Error occurred while joining the voice channel:", error);
        message.channel.send(
          "An error occurred while joining the voice channel."
        );
      }
    } else {
      message.channel.send(
        "You need to be in a voice channel to use this command!"
      );
    }
  } else if (command === Commands.COMMAND_LEAVE) {
    destroyVoiceConnection();
    console.log(
      "Bot has left the voice channel:",
      message.member.voice.channel.name
    );
  }
}
export function handleVoiceRecordCommand(message) {
  if (message.channelId !== Constants.COMMAND_CHANNEL) return;
  if (!message.content.startsWith("!") || message.author.bot) return;
  const command = message.content.toLowerCase();
  if (command === Commands.COMMAND_LISTEN) {
    console.log(message.author);
    listen(message.author.id);
    return bListen;
  } else if (command === Commands.COMMAND_STFU) {
    stfu();
  }
}
export function hnadleVoiceUpdateCommand(message) {
  if (message.channelId !== Constants.COMMAND_CHANNEL) return;
  if (!message.content.startsWith("!") || message.author.bot) return;
  const command = message.content.toLowerCase();
  if (command === Commands.COMMAND_MUTE_USER) {
    console.log("true");
  } else if (command === Commands.COMMAND_STFU) {
    stfu();
  }
}
