import { ChannelType, Client } from "discord.js";
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
import {
  findChannelById,
  findChannelByName,
} from "./server/service/ChannelService.js";
import { moveUsertoChannel } from "./server/manager/UserManager.js";
import findUserById, { findUserByName } from "./server/service/UserService.js";
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
  // test if channel can be found by either name or id, passed
  // console.log(
  //   await findChannelById(
  //     await server,
  //     ChannelType.GuildVoice,
  //     "1205854929772613632"
  //   ),
  //   await findChannelByName(await server, ChannelType.GuildVoice, "BotChannel")
  // );

  // test if user can be found by either name or id, passed
  // console.log(
  //   await findUserById(await server, "241600149845966860"),
  //   await findUserByName(await server, "zrennare")
  // );

  // test if user can be moved to a certain channel
  moveUsertoChannel(
    await findUserById(await server, "241600149845966860"),
    await findChannelById(
      await server,
      ChannelType.GuildVoice,
      "1205854929772613632"
    )
  );
});
client.on("messageCreate", (message) => {
  handleCommand(message, client);
  handleVoiceCommand(message);
});
