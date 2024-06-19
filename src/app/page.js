import SymHeader from "@/components/symHeader";
import SymHero from "@/components/symHero";
import Chat from "@/components/chat";
import Avatar from "@/components/avatar";
import { SessionProvider } from "next-auth/react";
import { PusherProvider } from "@/context/pusherContext";

export default function Home({ session }) {
  return (
    <div>
      <SessionProvider session={session}>
        <PusherProvider>
          <SymHero />
          <Chat />
          <Avatar />
        </PusherProvider>
      </SessionProvider>
    </div>
  );
}
