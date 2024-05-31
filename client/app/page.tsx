import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  LineChart,
  ScrollText,
  CalendarDays,
  CirclePlus,
} from "lucide-react";
import { Sidebar } from "@/components/layout/sidebar";
import { Content } from "@/components/layout/content";

export default function Home() {
  return (
    <main id="--main--page">
      <div id="container" className="flex gap-5">
        {/* ------- SIDEBAR ------- */}
        <Sidebar />
        {/* ------- CONTENT ------- */}
        <Content />
      </div>
    </main>
  );
}
