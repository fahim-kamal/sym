import { pusherServer } from "@/lib/pusher";

export async function POST(req) {
  const formData = await req.formData();
  const socket_id = formData.get("socket_id");

  const user = {
    id: "some_id",
    user_info: {
      name: "John Smith",
    },
    watchlist: [],
  };

  const authResponse = pusherServer.authenticateUser(socket_id, user);

  const res = new Response(JSON.stringify(authResponse), {
    status: 200,
  });

  return res;
}
