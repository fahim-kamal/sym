"use client";

import { useSession } from "next-auth/react";

export default function Avatar() {
  const session = useSession();
  console.log(session);
  return <div>{session.data?.user.name}</div>;
}
