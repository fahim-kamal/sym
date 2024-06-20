import SymHero from "@/components/symHero";
import { SessionProvider } from "next-auth/react";
import { PusherProvider } from "@/context/pusherContext";

export default function Home({ session }) {
  return (
    <div>
      <SessionProvider session={session}>
        <PusherProvider>
          <div className="mt-40">
            <SymHero />
          </div>
        </PusherProvider>
      </SessionProvider>
    </div>
  );
}
