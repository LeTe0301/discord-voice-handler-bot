export default async function findUserById(server, userId) {
  return await server.members.list({ limit: 100 }).then((members) => {
    return members.filter((member) => {
      return member.user.id == userId;
    });
  });
}

export async function findUserByName(server, userName) {
  return await server?.members.list({ limit: 100 }).then((members) => {
    return members.filter((member) => {
      return member.user.username == userName;
    });
  });
}
