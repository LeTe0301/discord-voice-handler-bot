import { joinVoiceChannel } from "@discordjs/voice";

let oVoiceConnection;

export function createVoiceConnection(oVoiceParams) {
  oVoiceConnection = joinVoiceChannel(oVoiceParams);
}

export function destroyVoiceConnection() {
  oVoiceConnection.destroy();
  oVoiceConnection == null;
}

export function getVoiceConnection() {
  return oVoiceConnection;
}
