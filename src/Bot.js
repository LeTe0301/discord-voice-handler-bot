import { Client, NewsChannel } from "discord.js";
import * as Constants from "./utils/Constants.js";
import config from "./config.json" assert { type: "json" };
import handleCommand from "./handler/CommandHandler.js";
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
});
client.on("messageCreate", (message) => {
  handleCommand(message, client);
});
client.on("voiceStateUpdate", (oldState, newState) => {
  server = newState.guild;
});
// client.on("messageCreate", (message) => {
//   handleJoinCommand(message, client);
// });
