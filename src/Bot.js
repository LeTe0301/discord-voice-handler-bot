import { Client } from "discord.js";
import {
  EndBehaviorType,
  createDefaultAudioReceiveStreamOptions,
} from "@discordjs/voice";
import * as Constants from "./utils/Constants.js";
import config from "./config.json" assert { type: "json" };
import handleCommand, { handleVoiceCommand } from "./handler/CommandHandler.js";
import {
  createVoiceConnection,
  getVoiceConnection,
} from "./handler/VoiceConnectionHandler.js";
import pkg from "@discordjs/opus";
const { OpusEncoder } = pkg;
const token = config.DISCORD_TOKEN;
const client = new Client({
  intents: Constants.INTENTS,
});
const serverId = Constants.GUILD_ID;
let server;

client.login(token);
client.once("ready", async () => {
  console.log("The bot is ready!");
  server = client.guilds.fetch(serverId);
  createVoiceConnection({
    channelId: "1056733057912164445",
    guildId: Constants.GUILD_ID,
    adapterCreator: client.guilds.cache.get("1056733056909721660")
      .voiceAdapterCreator,
    selfDeaf: false,
  });
});
client.on("messageCreate", (message) => {
  handleCommand(message, client);
  handleVoiceCommand(message);
});
// client.on("voiceStateUpdate", (oldState, newState) => {
//   server = newState.guild;
//   oVoiceConnection = getVoiceConnection();
//   receiver = oVoiceConnection.receiver;

//   console.log("OldState: ", oldState.id);
//   console.log("NewState: ", newState.id);

//   if (!newState.member.user.bot && bListen === true) {
//     // && oldState.channel !== newState.channel
//     const oAudioReceiveStream = receiver.subscribe(newState.id);
//     const oAudioOptions = createDefaultAudioReceiveStreamOptions();
//     console.log(receiver.subscribe(newState.id, oAudioOptions));
//     const encoder = new OpusEncoder(48000, 2);

//     oAudioReceiveStream.on("data", (chunk) => {
//       // const encoded = encoder.encode(chunk);
//       console.log(`Received ${chunk.length} bytes of data.`);
//     });
//     oAudioReceiveStream.on("end", () => {
//       console.log("no more data");
//     });
//   } else if (!newState.member.user.bot && bListen === false) {
//     receiver.unsubscribe();
//   }
// });
// client.on("messageCreate", (message) => {
//   handleJoinCommand(message, client);
// });

// Create the encoder.
// Specify 48kHz sampling rate and 2 channel size.
// const encoder = new OpusEncoder(48000, 2);

// // Encode and decode.
// const encoded = encoder.encode(buffer);
// const decoded = encoder.decode(encoded);
