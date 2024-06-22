import { TopBar } from "./navigation/tob-bar";
import { ServerWrapper } from "./server-wrapper";
import { ClientWrapper } from "./client-wrapper";
import { Suspense } from "react";
import { LoadingSkeleton } from "./ui/skeleton";

export function Content() {
  return (
    <div
      id="content"
      data-state="closed"
      className="pointer-events-auto w-full select-auto p-4 data-[state=open]:pointer-events-none data-[state=open]:select-none"
    >
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
