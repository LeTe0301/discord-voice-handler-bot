import { Client } from "discord.js";
import * as Constants from "./utils/Constants.js";
import config from "./config.json" assert { type: "json" };
import { handleJoinCommand } from "./handler/CommandHandler.js";
const token = config.DISCORD_TOKEN;
const client = new Client({
  intents: Constants.INTENTS,
});
const serverId = Constants.GUILD_ID;
console.log(token);
client.login(token);
client.once("ready", async () => {
  console.log("The bot is ready!");
});
client.on("messageCreate", (message) => {
  handleJoinCommand(message, client);
});
// client.on("messageCreate", (message) => {
//   handleJoinCommand(message, client);
// });
