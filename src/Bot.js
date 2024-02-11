import { Client } from "discord.js";
import {
  EndBehaviorType,
  createDefaultAudioReceiveStreamOptions,
} from "@discordjs/voice";
import * as Constants from "./utils/Constants.js";
import config from "./config.json" assert { type: "json" };
import handleCommand from "./handler/CommandHandler.js";
import { getVoiceConnection } from "./handler/VoiceConnectionHandler.js";
const token = config.DISCORD_TOKEN;
const client = new Client({
  intents: Constants.INTENTS,
});
const serverId = Constants.GUILD_ID;
let server;
let oVoiceConnection;
let receiver;
client.login(token);
client.once("ready", async () => {
  console.log("The bot is ready!");
  server = client.guilds.fetch(serverId);
});
client.on("messageCreate", (message) => {
  handleCommand(message, client);
});
client.on("voiceStateUpdate", (oldState, newState) => {
  server = newState.guild;
  oVoiceConnection = getVoiceConnection();
  receiver = oVoiceConnection.receiver;

  console.log("OldState: ", oldState.id);
  console.log("NewState: ", newState.id);

  if (!newState.member.user.bot && oldState.channel === null) {
    receiver.subscribe(newState.id);
    const oAudioOptions = createDefaultAudioReceiveStreamOptions();
    console.log(receiver.subscribe(newState.id, oAudioOptions));
  }
});
// client.on("messageCreate", (message) => {
//   handleJoinCommand(message, client);
// });
