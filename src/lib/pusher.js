import * as PusherServer from "pusher";

const pusherAuthenticateEndpoint = "/api/pusher/authenticate";
const pusherAuthorizeEndpoint = "/api/pusher/authorize";

const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  useTLS: true,
});

export { pusherServer, pusherAuthenticateEndpoint, pusherAuthorizeEndpoint };
