import { TopBar } from "./tob-bar";
import { ClientWrapper } from "./client-wrapper";

export function Content() {
  return (
    <div id="content" className="w-full p-4">
      {/* ------- TOP BAR ------- */}
      <TopBar />
      {/* ------- CLIENT WRAPPER ------- */}
      <ClientWrapper />
    </div>
  );
}
