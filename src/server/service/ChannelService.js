export async function findChannelByName(server, type, channelName) {
  let requestedChannels;
  await server?.channels
    .fetch()
    .then((channels) => {
      requestedChannels = channels.filter((channel) => {
        return channel.type == type && channel.name == channelName;
      });
    })
    .catch(console.error);
  if (requestedChannels.size > 1) {
    return requestedChannels;
  } else {
    return requestedChannels.find((channel) => channel.name == channelName);
  }
}

export async function findChannelById(server, type, channelId) {
  let channel;
  await server.channels.fetch().then((channels) => {
    channel = channels.find((channel) => {
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
