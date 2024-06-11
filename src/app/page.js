import SymHeader from "@/components/symHeader";
import Chat from "@/components/chat";

import { PusherProvider } from "@/context/pusherContext";

export default function Home() {
  return (
    <div>
      <PusherProvider>
        <SymHeader />
        <Chat />
      </PusherProvider>
    </div>
  );
}
