export default async function findUserById(server, userId) {
  let member;
  await server.members.list({ limit: 100 }).then((members) => {
    member = members.find((member) => {
      return member.user.id == userId;
    });
  });
  return member;
}

export async function findUserByName(server, userName) {
  let requestedMembers;
  await server?.members.list({ limit: 100 }).then((members) => {
    requestedMembers = members.filter((member) => {
      return member.user.username == userName;
    });
  });
  if (requestedMembers > 1) {
    return requestedMembers;
  } else {
    requestedMembers.find((member) => member.name == userName);
  }
}
