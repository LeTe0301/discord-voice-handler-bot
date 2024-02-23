import { GuildMember } from "discord.js";

export function moveUsertoChannel(user, channel) {
  console.log(user);
  user.voice.setChannel(channel);
}

export function muteUser(user, reason) {
  user.voice.setMute(true, reason);
}

export function unMuteUser(user) {
  user.voice.setMute(false);
}

export function deafenUser(user, reason) {
  user.voice.setDeaf(true, reason);
}

export function unDeafenUser(user) {
  user.voice.setDeaf(false);
}
