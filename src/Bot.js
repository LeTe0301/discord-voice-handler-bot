import {
    Client,
  } from "discord.js";
  import * as config from "./config.json";
  import * as Constants from "./util/constants";
  const token = config.DISCORD_TOKEN;
  const client = new Client({
    intents: Constants.INTENTS,
  });
  
  client.login(token);