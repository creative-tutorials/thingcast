import { TopBar } from "./navigation/tob-bar";
import { ServerWrapper } from "./server-wrapper";
import { ClientWrapper } from "./client-wrapper";
import { Suspense } from "react";
import { LoadingSkeleton } from "./ui/skeleton";

export function Content() {
  return (
    <div id="content" className="w-full p-4">
      {/* ------- TOP BAR ------- */}
      <TopBar />
      {/* ------- SERVER WRAPPER ------- */}
      <ServerWrapper>
        {/* ------- CLIENT WRAPPER ------- */}
        <Suspense fallback={<LoadingSkeleton />}>
          <ClientWrapper />
        </Suspense>
      </ServerWrapper>
    </div>
  );
}
