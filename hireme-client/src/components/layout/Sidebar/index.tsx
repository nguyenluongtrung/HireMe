
import { getServerSession } from "next-auth";

import SidebarClient from "./SidebarClient";

import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function Sidebar({
  className,
}: {
  className?: string;
}) {
  const session = await getServerSession(options);

  return <SidebarClient session={session} className={className} />;
}
