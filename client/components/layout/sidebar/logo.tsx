"use client";

import { Menu } from "lucide-react";

export function AppLogo() {
  const closeSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");
    if (sidebar && content) {
      sidebar.setAttribute("data-state", "closed"); // close sidebar
      content.setAttribute("data-state", "closed"); // close heading group
    }
  };

  return (
    <div id="--app--logo" className="flex items-center gap-3">
      <Menu className="cursor-pointer text-white" onClick={closeSidebar} />
      <h3 className="select-none text-xl font-bold text-white">
        Thing<span className="text-indigo-500">Cast</span>
      </h3>
    </div>
  );
}
