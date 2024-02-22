export async function findChannelByName(server, type, channelName) {
  let requestedChannels;
  await server?.channels
    .fetch()
    .then((channels) => {
      requestedChannels = channels.filter((channel) => {
        return channel.type == type && channel.name == channelName;
      });
      // .map((channel) => {
      //   return channel;
      // });
    })
    .catch(console.error);
  return requestedChannels;
}

export async function findChannelById(server, type, channelId) {
  console.log(server.channels);
  const channel = await server.channels.fetch().then((channels) => {
    return channels.filter((channel) => {
      let channelPredicate = true;
      if (type) {
        channelPredicate = channel.type == type;
      }
      channelPredicate = channelPredicate && channel.id == channelId;
      return channelPredicate;
    });
  });
  return channel;
}
