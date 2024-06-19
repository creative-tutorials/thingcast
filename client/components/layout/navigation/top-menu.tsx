"use client";

import { Menu } from "lucide-react";
export function TopMenu() {
  const openSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.setAttribute("data-state", "open"); // open sidebar
    }
  };

  return (
    <div id="top-menu" className="flex items-start gap-5">
      <Menu className="cursor-pointer text-white" onClick={openSidebar} />
      <hgroup>
        <h1 className="text-xl font-bold text-white">Events</h1>
        <p className="text-sm text-muted-foreground">
          Create events to share with your teams or viewers
        </p>
      </hgroup>
    </div>
  );
}
