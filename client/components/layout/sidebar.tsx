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
      className="w-full max-w-60 h-screen p-4 bg-transparent border-r border-neutral-600 flex flex-col gap-5"
    >
      <div id="--app--logo">
        <h3 className="text-xl font-bold text-white">
          Thing<span className="text-indigo-500">Cast</span>
        </h3>
      </div>
      <div id="sidebar-menu">
        <ul className="flex flex-col gap-5">
          <li>
            <a
              href="#content"
              className="group flex items-center gap-1 p-2 bg-transparent transition-all hover:bg-primary-hover-primary hover:px-3 text-white rounded-md hover:shadow-md"
            >
              <LayoutDashboard />{" "}
              <span className="text-sm transition-all group-hover:text-base">
                Dashboard
              </span>
            </a>
          </li>
          <li>
            <a
              href="#content"
              className="group flex items-center gap-1 p-2 bg-transparent transition-all hover:bg-primary-hover-primary hover:px-3 text-white rounded-md hover:shadow-md"
            >
              <LineChart />{" "}
              <span className="text-sm transition-all group-hover:text-base">
                Analytics
              </span>
            </a>
          </li>
          <li>
            <a
              href="#content"
              className="group flex items-center gap-1 p-2 bg-transparent transition-all hover:bg-primary-hover-primary hover:px-3 text-white rounded-md hover:shadow-md"
            >
              <ScrollText />
              <span className="text-sm transition-all group-hover:text-base">
                Invoice
              </span>
            </a>
          </li>
          <li>
            <a
              href="#content"
              className="group flex items-center gap-1 p-2 bg-transparent transition-all hover:bg-primary-hover-primary hover:px-3 text-white rounded-md hover:shadow-md"
            >
              <CalendarDays />
              <span className="text-sm transition-all group-hover:text-base">
                Schedule
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
