import { SidebarFooter } from "./sidebar/footer";
import {
  LayoutDashboard,
  LineChart,
  ScrollText,
  CalendarDays,
} from "lucide-react";

export function Sidebar() {
  return (
    <div
      id="sidebar"
      className="flex h-screen w-full max-w-60 flex-col gap-5 border-r border-neutral-800 bg-transparent p-4"
    >
      <div id="--app--logo">
        <h3 className="text-xl font-bold text-white">
          Thing<span className="text-indigo-500">Cast</span>
        </h3>
      </div>
      <div id="sidebar-menu">
        <ul className="flex flex-col gap-2">
          <li>
            <a
              href="#content"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-white transition-all hover:bg-primary-hover-primary hover:shadow-md"
            >
              <LayoutDashboard width={20} height={20} />{" "}
              <span className="text-sm transition-all">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#content"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-white transition-all hover:bg-primary-hover-primary hover:shadow-md"
            >
              <LineChart width={20} height={20} />{" "}
              <span className="text-sm transition-all">Analytics</span>
            </a>
          </li>
          <li>
            <a
              href="#content"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-white transition-all hover:bg-primary-hover-primary hover:shadow-md"
            >
              <ScrollText width={20} height={20} />
              <span className="text-sm transition-all">Invoice</span>
            </a>
          </li>
          <li>
            <a
              href="#content"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-white transition-all hover:bg-primary-hover-primary hover:shadow-md"
            >
              <CalendarDays width={20} height={20} />
              <span className="text-sm transition-all">Schedule</span>
            </a>
          </li>
        </ul>
      </div>
      <SidebarFooter />
    </div>
  );
}
