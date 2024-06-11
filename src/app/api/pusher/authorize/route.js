import { pusherServer } from "@/lib/pusher";

export async function POST(req) {
  const formData = await req.formData();
  const socket_id = formData.get("socket_id");
  const channel_name = formData.get("channel_name");

  console.log(channel_name);

  const authorizeResponse = pusherServer.authorizeChannel(
    socket_id,
    channel_name
  );

  const res = new Response(JSON.stringify(authorizeResponse), {
    status: 200,
  });

  return res;
}
