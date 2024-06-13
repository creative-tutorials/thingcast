import { SidebarFooter } from "./sidebar/footer";
import {
  LayoutDashboard,
  LineChart,
  ScrollText,
  CalendarDays,
  BarChart,
  Users,
  Grid,
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
              href="/dashboard"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-neutral-300 transition-all hover:bg-primary-hover-primary hover:text-white hover:shadow-md"
            >
              <LayoutDashboard width={20} height={20} />{" "}
              <span className="text-sm">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/insights"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-neutral-300 transition-all hover:bg-primary-hover-primary hover:text-white hover:shadow-md"
            >
              <BarChart width={20} height={20} />{" "}
              <span className="text-sm">Insights</span>
            </a>
          </li>
          <li>
            <a
              href="/teams"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-neutral-300 transition-all hover:bg-primary-hover-primary hover:text-white hover:shadow-md"
            >
              <Users width={20} height={20} />
              <span className="text-sm">Teams</span>
            </a>
          </li>
          <li>
            <a
              href="/bookings"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-neutral-300 transition-all hover:bg-primary-hover-primary hover:text-white hover:shadow-md"
            >
              <CalendarDays width={20} height={20} />
              <span className="text-sm">Bookings</span>
            </a>
          </li>
          <li>
            <a
              href="/apps"
              className="flex items-center gap-1 rounded-md bg-transparent p-2 text-neutral-300 transition-all hover:bg-primary-hover-primary hover:text-white hover:shadow-md"
            >
              <Grid width={20} height={20} />
              <span className="text-sm">Apps</span>
            </a>
          </li>
        </ul>
      </div>
      <SidebarFooter />
    </div>
  );
}
