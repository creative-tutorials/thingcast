"use client";

import { Menu } from "lucide-react";

export function TopMenuMobile() {
  const openSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    const content = document.getElementById("content");
    if (sidebar && content) {
      sidebar.setAttribute("data-state", "open"); // open sidebar
      content.setAttribute("data-state", "open"); // open heading group
    }
  };

  return <Menu className="cursor-pointer text-white" onClick={openSidebar} />;
}
