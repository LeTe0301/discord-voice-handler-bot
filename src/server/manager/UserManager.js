export function moveUsertoChannel(user, channel) {
  console.log(user);
  console.log(channel);
  user.voice.setChannel(channel);
}
